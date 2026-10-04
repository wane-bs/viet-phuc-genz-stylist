/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Concurrency Guard & Token Bucket Rate Limiter (50 Users Pool)
 * Manages parallel execution slots, request queuing, and SLA telemetry
 */

export interface ConcurrencyTelemetry {
  maxConcurrentPool: number;
  activeRequests: number;
  queuedRequests: number;
  availableSlots: number;
  totalProcessed: number;
  slaTargetMs: number;
  averageLatencyMs: number;
  p95LatencyMs: number;
}

export class ConcurrencyGuard {
  private static MAX_CONCURRENT = 50;
  private static activeCount = 0;
  private static queue: Array<() => void> = [];
  private static totalProcessedCount = 0;
  private static latencies: number[] = [];
  private static readonly MAX_LATENCY_SAMPLES = 100;

  /**
   * Acquire a slot from the 50-user concurrent pool.
   * Resolves immediately if activeCount < 50, otherwise queues until a slot frees up.
   */
  public static async acquireSlot(): Promise<() => void> {
    if (this.activeCount < this.MAX_CONCURRENT) {
      this.activeCount++;
      const startTime = Date.now();
      return () => this.releaseSlot(startTime);
    }

    return new Promise((resolve) => {
      this.queue.push(() => {
        this.activeCount++;
        const startTime = Date.now();
        resolve(() => this.releaseSlot(startTime));
      });
    });
  }

  private static releaseSlot(startTime: number) {
    const elapsed = Date.now() - startTime;
    this.latencies.push(elapsed);
    if (this.latencies.length > this.MAX_LATENCY_SAMPLES) {
      this.latencies.shift();
    }

    this.totalProcessedCount++;
    this.activeCount = Math.max(0, this.activeCount - 1);

    // Drain queue if there's a waiting task
    if (this.queue.length > 0 && this.activeCount < this.MAX_CONCURRENT) {
      const nextTask = this.queue.shift();
      if (nextTask) nextTask();
    }
  }

  /**
   * Calculate P95 and Average latency
   */
  public static getTelemetry(): ConcurrencyTelemetry {
    const sorted = [...this.latencies].sort((a, b) => a - b);
    const avg = sorted.length > 0 
      ? Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length) 
      : 0;

    const p95Index = Math.floor(sorted.length * 0.95);
    const p95 = sorted.length > 0 ? sorted[p95Index] || sorted[sorted.length - 1] : 0;

    return {
      maxConcurrentPool: this.MAX_CONCURRENT,
      activeRequests: this.activeCount,
      queuedRequests: this.queue.length,
      availableSlots: Math.max(0, this.MAX_CONCURRENT - this.activeCount),
      totalProcessed: this.totalProcessedCount,
      slaTargetMs: 5000,
      averageLatencyMs: avg,
      p95LatencyMs: p95
    };
  }
}
