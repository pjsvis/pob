/**
 * Build Coordinator
 * 
 * Orchestrates the watch → queue → worker pipeline.
 */

import { resolve } from "path";
import { readdirSync } from "fs";
import { BuildQueue, BuildTask, TaskPriority } from "./queue.js";
import { ContentWatcher, WatchEvent } from "./watcher.js";
import { BuildWorker, BuildResult, WorkerOptions } from "./worker.js";

export interface CoordinatorOptions {
  contentDir: string;
  distDir: string;
  templatePath: string;
  watchDebounce?: number;
}

export class BuildCoordinator {
  private queue: BuildQueue;
  private watcher: ContentWatcher;
  private worker: BuildWorker;
  private isRunning: boolean = false;
  private listeners: Set<(event: CoordinatorEvent) => void> = new Set();

  constructor(options: CoordinatorOptions) {
    this.queue = new BuildQueue();
    
    this.watcher = new ContentWatcher({
      dir: options.contentDir,
      extensions: [".md"],
      debounce: options.watchDebounce ?? 300,
      ignore: [/node_modules/, /\.git/, /dist/],
    });
    
    this.worker = new BuildWorker({
      contentDir: options.contentDir,
      distDir: options.distDir,
      templatePath: options.templatePath,
    });

    // Wire up events
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Queue events → coordinator events
    this.queue.on(event => {
      this.emit({ type: "queue", event });
      this.updateStatus();
    });

    // Watch events → queue actions
    this.watcher.on(event => {
      this.handleWatchEvent(event);
    });
  }

  private handleWatchEvent(event: WatchEvent): void {
    const relativePath = event.relativePath;
    
    switch (event.type) {
      case "add":
      case "change":
        // Add to queue with "review" priority for changed files
        this.queue.add(relativePath, "review");
        this.queue.queue(relativePath);
        this.processQueue();
        break;
        
      case "unlink":
        // Remove from queue
        this.queue.remove(relativePath);
        this.emit({ type: "file-removed", path: relativePath });
        break;
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isRunning) return;
    
    const task = this.queue.getNext();
    if (!task) return;

    this.isRunning = true;
    this.queue.markRunning(task.file);
    this.emit({ type: "build-start", file: task.file });

    const result = await this.worker.build(task.file);

    if (result.success) {
      this.queue.markDone(task.file);
      this.emit({
        type: "build-complete",
        file: task.file,
        elapsed: result.elapsed,
        size: result.size,
      });
    } else {
      this.queue.markFailed(task.file, result.error ?? "Unknown error");
      this.emit({
        type: "build-error",
        file: task.file,
        error: result.error ?? "Unknown error",
      });
    }

    this.isRunning = false;

    // Process next task
    this.processQueue();
  }

  /**
   * Start watching and processing
   */
  async start(): Promise<void> {
    // Scan existing files
    const files = this.watcher.scan();
    
    for (const file of files) {
      const relative = file.replace(resolve(this.options.contentDir) + "/", "");
      this.queue.add(relative, "published");
      this.queue.queue(relative);
    }

    // Start watching
    this.watcher.start();
    
    // Process initial queue
    this.processQueue();
    
    this.emit({ type: "started", files: files.length });
  }

  private get options(): CoordinatorOptions {
    return {
      contentDir: this.watcher["dir"],
      distDir: this.worker["distDir"],
      templatePath: this.worker["template"],
    } as CoordinatorOptions;
  }

  /**
   * Stop watching and processing
   */
  stop(): void {
    this.watcher.stop();
    this.emit({ type: "stopped" });
  }

  /**
   * Queue a specific file for build
   */
  queueFile(file: string, priority: TaskPriority = "draft"): void {
    this.queue.add(file, priority);
    this.queue.queue(file);
    this.processQueue();
  }

  /**
   * Force rebuild a file
   */
  async rebuildFile(file: string): Promise<BuildResult> {
    this.queue.add(file, "critical");
    this.queue.queue(file);
    return await this.worker.build(file);
  }

  /**
   * Get current status
   */
  getStatus(): CoordinatorStatus {
    return {
      isRunning: this.isRunning,
      queue: this.queue.getStats(),
      tasks: this.queue.getAll(),
    };
  }

  /**
   * Subscribe to coordinator events
   */
  on(callback: (event: CoordinatorEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private updateStatus(): void {
    this.emit({ type: "status", status: this.getStatus() });
  }

  private emit(event: CoordinatorEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export interface CoordinatorStatus {
  isRunning: boolean;
  queue: {
    total: number;
    pending: number;
    queued: number;
    running: number;
    done: number;
    failed: number;
  };
  tasks: BuildTask[];
}

export type CoordinatorEvent =
  | { type: "started"; files: number }
  | { type: "stopped" }
  | { type: "file-removed"; path: string }
  | { type: "build-start"; file: string }
  | { type: "build-complete"; file: string; elapsed: number; size?: number }
  | { type: "build-error"; file: string; error: string }
  | { type: "queue"; event: import("./queue.js").QueueEvent }
  | { type: "status"; status: CoordinatorStatus };