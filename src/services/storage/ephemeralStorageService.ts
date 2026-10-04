/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Ephemeral Asset Storage & Presigned URL Engine (GCS Simulation)
 * Implements Object Lifecycle TTL (2 hours) & 15-minute Presigned URLs
 */

export interface StoredArtifactMetadata {
  id: string;
  originalName: string;
  contentType: string;
  sizeBytes: number;
  createdAt: number;
  expiresAt: number; // TTL 2 hours
  signedUrl: string;
  signedUrlExpiresAt: number; // 15 mins
  isEphemeral: boolean;
}

export class EphemeralStorageService {
  private static storageBucket = new Map<string, { data: string; meta: StoredArtifactMetadata }>();
  private static readonly TTL_MS = 2 * 60 * 60 * 1000; // 2 hours TTL
  private static readonly SIGNED_URL_TTL_MS = 15 * 60 * 1000; // 15 mins

  /**
   * Store image payload with 2-hour TTL and generate a 15-minute presigned access URL
   */
  public static storeArtifact(
    base64OrDataUrl: string,
    filename: string = 'tryon-result.jpg',
    mimeType: string = 'image/jpeg'
  ): StoredArtifactMetadata {
    this.evictExpiredObjects();

    const id = `art_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = Date.now();
    const sizeBytes = Math.round((base64OrDataUrl.length * 3) / 4);

    const meta: StoredArtifactMetadata = {
      id,
      originalName: filename,
      contentType: mimeType,
      sizeBytes,
      createdAt: now,
      expiresAt: now + this.TTL_MS,
      signedUrl: `/api/v1/storage/artifacts/${id}?token=sig_${Math.random().toString(36).substring(2, 12)}&exp=${now + this.SIGNED_URL_TTL_MS}`,
      signedUrlExpiresAt: now + this.SIGNED_URL_TTL_MS,
      isEphemeral: true
    };

    this.storageBucket.set(id, { data: base64OrDataUrl, meta });
    return meta;
  }

  /**
   * Retrieve artifact content if not expired
   */
  public static getArtifact(id: string): { data: string; meta: StoredArtifactMetadata } | null {
    const item = this.storageBucket.get(id);
    if (!item) return null;

    if (Date.now() > item.meta.expiresAt) {
      this.storageBucket.delete(id);
      return null;
    }

    return item;
  }

  /**
   * Evict objects older than 2 hours (Lifecycle rule simulation)
   */
  public static evictExpiredObjects(): number {
    const now = Date.now();
    let evicted = 0;
    for (const [id, item] of this.storageBucket.entries()) {
      if (now > item.meta.expiresAt) {
        this.storageBucket.delete(id);
        evicted++;
      }
    }
    return evicted;
  }

  /**
   * Get storage telemetry statistics
   */
  public static getTelemetry() {
    this.evictExpiredObjects();
    const objects = Array.from(this.storageBucket.values());
    const totalBytes = objects.reduce((sum, item) => sum + item.meta.sizeBytes, 0);

    return {
      bucketName: 'viet-phuc-ephemeral-artifacts',
      lifecycleRule: 'Delete objects older than 2 hours (TTL 120m)',
      activeObjectCount: objects.length,
      totalMemoryUsageMB: Number((totalBytes / (1024 * 1024)).toFixed(2)),
      presignedUrlDurationMinutes: 15,
      timestamp: new Date().toISOString()
    };
  }
}
