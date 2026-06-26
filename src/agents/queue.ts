/**
 * Build Task Queue
 * 
 * Manages the build pipeline: priority queuing, dependencies, status tracking.
 */

export type TaskStatus = "pending" | "queued" | "running" | "done" | "failed";
export type TaskPriority = "draft" | "review" | "published" | "critical";

export interface BuildTask {
  id: string;
  file: string;
  priority: TaskPriority;
  status: TaskStatus;
  addedAt: number;
  startedAt?: number;
  completedAt?: number;
  error?: string;
  dependencies?: string[];
}

export class BuildQueue {
  private tasks: Map<string, BuildTask> = new Map();
  private listeners: Set<(event: QueueEvent) => void> = new Set();

  // Priority order: critical > published > review > draft
  private priorityOrder: Record<TaskPriority, number> = {
    critical: 0,
    published: 1,
    review: 2,
    draft: 3,
  };

  add(file: string, priority: TaskPriority = "draft", dependencies?: string[]): BuildTask {
    const existing = this.tasks.get(file);
    if (existing) {
      // Update priority if higher
      if (this.priorityOrder[priority] < this.priorityOrder[existing.priority]) {
        existing.priority = priority;
        this.emit({ type: "priority-changed", task: existing });
      }
      return existing;
    }

    const task: BuildTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      priority,
      status: "pending",
      addedAt: Date.now(),
      dependencies,
    };

    this.tasks.set(file, task);
    this.emit({ type: "added", task });
    return task;
  }

  queue(file: string): BuildTask | undefined {
    const task = this.tasks.get(file);
    if (!task || task.status !== "pending") return undefined;
    
    task.status = "queued";
    this.emit({ type: "queued", task });
    return task;
  }

  markRunning(file: string): BuildTask | undefined {
    const task = this.tasks.get(file);
    if (!task || task.status !== "queued") return undefined;
    
    task.status = "running";
    task.startedAt = Date.now();
    this.emit({ type: "started", task });
    return task;
  }

  markDone(file: string): BuildTask | undefined {
    const task = this.tasks.get(file);
    if (!task || task.status !== "running") return undefined;
    
    task.status = "done";
    task.completedAt = Date.now();
    this.emit({ type: "completed", task });
    return task;
  }

  markFailed(file: string, error: string): BuildTask | undefined {
    const task = this.tasks.get(file);
    if (!task || task.status !== "running") return undefined;
    
    task.status = "failed";
    task.error = error;
    task.completedAt = Date.now();
    this.emit({ type: "failed", task });
    return task;
  }

  remove(file: string): boolean {
    const task = this.tasks.get(file);
    if (!task) return false;
    
    this.tasks.delete(file);
    this.emit({ type: "removed", task });
    return true;
  }

  getNext(): BuildTask | undefined {
    // Get queued tasks sorted by priority
    const queued = Array.from(this.tasks.values())
      .filter(t => t.status === "queued")
      .sort((a, b) => this.priorityOrder[a.priority] - this.priorityOrder[b.priority]);
    
    return queued[0];
  }

  get(file: string): BuildTask | undefined {
    return this.tasks.get(file);
  }

  getAll(): BuildTask[] {
    return Array.from(this.tasks.values());
  }

  getStats(): QueueStats {
    const tasks = Array.from(this.tasks.values());
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === "pending").length,
      queued: tasks.filter(t => t.status === "queued").length,
      running: tasks.filter(t => t.status === "running").length,
      done: tasks.filter(t => t.status === "done").length,
      failed: tasks.filter(t => t.status === "failed").length,
    };
  }

  clear(completedOnly = true): number {
    const before = this.tasks.size;
    
    if (completedOnly) {
      for (const [file, task] of this.tasks) {
        if (task.status === "done" || task.status === "failed") {
          this.tasks.delete(file);
        }
      }
    } else {
      this.tasks.clear();
    }

    return before - this.tasks.size;
  }

  // Event system
  on(callback: (event: QueueEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private emit(event: QueueEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export interface QueueStats {
  total: number;
  pending: number;
  queued: number;
  running: number;
  done: number;
  failed: number;
}

export type QueueEvent =
  | { type: "added"; task: BuildTask }
  | { type: "removed"; task: BuildTask }
  | { type: "queued"; task: BuildTask }
  | { type: "started"; task: BuildTask }
  | { type: "completed"; task: BuildTask }
  | { type: "failed"; task: BuildTask }
  | { type: "priority-changed"; task: BuildTask };