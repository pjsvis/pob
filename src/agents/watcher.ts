/**
 * File System Watcher
 * 
 * Watches content files and emits events on changes.
 * Uses Bun's native file watching for efficiency.
 */

import { watch } from "fs";
import { readdirSync, statSync, existsSync } from "fs";
import { resolve, extname, join } from "path";

export interface WatchOptions {
  /** Directory to watch */
  dir: string;
  /** File extensions to watch */
  extensions?: string[];
  /** Debounce delay in ms */
  debounce?: number;
  /** Ignore patterns */
  ignore?: RegExp[];
}

export interface WatchEvent {
  type: "add" | "change" | "unlink";
  path: string;
  relativePath: string;
  timestamp: number;
}

type EventCallback = (event: WatchEvent) => void;

export class ContentWatcher {
  private dir: string;
  private extensions: Set<string>;
  private ignore: RegExp[];
  private debounceMs: number;
  private callbacks: Set<EventCallback> = new Set();
  private watchers: Map<string, import("fs").FSWatcher> = new Map();
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
  private watchedFiles: Set<string> = new Set();

  constructor(options: WatchOptions) {
    this.dir = resolve(options.dir);
    this.extensions = new Set(options.extensions ?? [".md"]);
    this.ignore = options.ignore ?? [/node_modules/, /\.git/, /dist/];
    this.debounceMs = options.debounce ?? 300;
  }

  /**
   * Start watching the directory recursively
   */
  start(): void {
    this.watchDir(this.dir);
  }

  /**
   * Stop watching
   */
  stop(): void {
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    this.watchers.clear();
    this.watchedFiles.clear();
    
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  /**
   * Subscribe to file change events
   */
  on(callback: EventCallback): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  private watchDir(dir: string): void {
    if (this.shouldIgnore(dir)) return;

    try {
      const files = readdirSync(dir);
      
      for (const file of files) {
        const fullPath = join(dir, file);
        
        if (this.shouldIgnore(fullPath)) continue;

        try {
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            this.watchDir(fullPath);
          } else if (stat.isFile() && this.isWatchedExtension(file)) {
            this.watchFile(fullPath);
          }
        } catch {
          // Skip files we can't stat
        }
      }
    } catch {
      // Skip dirs we can't read
    }
  }

  private watchFile(file: string): void {
    if (this.watchedFiles.has(file)) return;
    this.watchedFiles.add(file);

    try {
      const watcher = watch(file, (eventType, filename) => {
        if (!filename) return;
        
        const fullPath = join(this.dir, filename);
        if (!existsSync(fullPath)) {
          // File was deleted
          this.emit({
            type: "unlink",
            path: fullPath,
            relativePath: this.getRelativePath(fullPath),
            timestamp: Date.now(),
          });
          return;
        }

        // Debounce rapid changes
        this.debounce(fullPath, () => {
          const type = this.watchedFiles.has(fullPath) ? "change" : "add";
          this.watchedFiles.add(fullPath);
          
          this.emit({
            type,
            path: fullPath,
            relativePath: this.getRelativePath(fullPath),
            timestamp: Date.now(),
          });
        });
      });

      this.watchers.set(file, watcher);
    } catch {
      // Skip files we can't watch
    }
  }

  private debounce(path: string, callback: () => void): void {
    const existing = this.debounceTimers.get(path);
    if (existing) {
      clearTimeout(existing);
    }

    const timer = setTimeout(() => {
      this.debounceTimers.delete(path);
      callback();
    }, this.debounceMs);

    this.debounceTimers.set(path, timer);
  }

  private emit(event: WatchEvent): void {
    for (const callback of this.callbacks) {
      callback(event);
    }
  }

  private shouldIgnore(path: string): boolean {
    for (const pattern of this.ignore) {
      if (pattern.test(path)) return true;
    }
    return false;
  }

  private isWatchedExtension(file: string): boolean {
    return this.extensions.has(extname(file).toLowerCase());
  }

  private getRelativePath(fullPath: string): string {
    return fullPath.replace(this.dir + "/", "");
  }

  /**
   * Scan directory for all watched files
   */
  scan(): string[] {
    const files: string[] = [];
    
    const scanDir = (dir: string): void => {
      if (this.shouldIgnore(dir)) return;
      
      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          const fullPath = join(dir, entry);
          
          if (this.shouldIgnore(fullPath)) continue;

          try {
            const stat = statSync(fullPath);
            
            if (stat.isDirectory()) {
              scanDir(fullPath);
            } else if (stat.isFile() && this.isWatchedExtension(entry)) {
              files.push(fullPath);
            }
          } catch {
            // Skip
          }
        }
      } catch {
        // Skip
      }
    };

    scanDir(this.dir);
    return files;
  }
}