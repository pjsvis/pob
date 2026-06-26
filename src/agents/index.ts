/**
 * Agent Infrastructure for pob
 * 
 * Lightweight build automation: task queue, file watching, worker coordination.
 */

export { BuildQueue } from "./queue.js";
export { ContentWatcher } from "./watcher.js";
export { BuildWorker } from "./worker.js";
export { BuildCoordinator } from "./coordinator.js";
export { processDiagrams, renderMermaid, asciiToSvg, exportDiagrams, DIAGRAM_CSS } from "./diagrams.js";

export type { BuildTask, TaskStatus, TaskPriority } from "./queue.js";
export type { QueueStats, QueueEvent } from "./queue.js";
export type { WatchEvent, WatchOptions } from "./watcher.js";
export type { BuildResult, WorkerOptions } from "./worker.js";
export type { CoordinatorStatus, CoordinatorEvent } from "./coordinator.js";
export type { CoordinatorOptions } from "./coordinator.js";
export type { DiagramResult, AsciiSvgOptions, ExportOptions } from "./diagrams.js";