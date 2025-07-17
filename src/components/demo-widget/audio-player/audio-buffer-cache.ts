/**
 * LRU Cache for audio buffers to prevent duplicate fetching and improve performance
 */
class AudioBufferCache {
  private cache = new Map<string, { buffer: AudioBuffer; timestamp: number }>()
  private pendingRequests = new Map<string, Promise<AudioBuffer>>()
  private maxSize: number
  private maxAge: number // in milliseconds

  constructor(maxSize = 20, maxAge = 10 * 60 * 1000) {
    // 10 minutes default
    this.maxSize = maxSize
    this.maxAge = maxAge
  }

  private cleanup() {
    const now = Date.now()
    const expiredKeys: string[] = []

    for (const [key, value] of this.cache) {
      if (now - value.timestamp > this.maxAge) {
        expiredKeys.push(key)
      }
    }

    for (const key of expiredKeys) {
      this.cache.delete(key)
    }
  }

  private evictLRU() {
    if (this.cache.size >= this.maxSize) {
      let oldestKey = ""
      let oldestTime = Number.MAX_SAFE_INTEGER

      for (const [key, value] of this.cache) {
        if (value.timestamp < oldestTime) {
          oldestTime = value.timestamp
          oldestKey = key
        }
      }

      if (oldestKey) {
        this.cache.delete(oldestKey)
      }
    }
  }

  get(key: string): AudioBuffer | null {
    this.cleanup()

    const item = this.cache.get(key)
    if (!item) return null

    // Update timestamp for LRU
    item.timestamp = Date.now()
    this.cache.set(key, item)

    return item.buffer
  }

  set(key: string, buffer: AudioBuffer): void {
    this.cleanup()
    this.evictLRU()

    this.cache.set(key, {
      buffer,
      timestamp: Date.now(),
    })
  }

  clear(): void {
    this.cache.clear()
    this.pendingRequests.clear()
  }

  size(): number {
    this.cleanup()
    return this.cache.size
  }

  /**
   * Check if a request is currently pending for this key
   */
  hasPending(key: string): boolean {
    return this.pendingRequests.has(key)
  }

  /**
   * Get pending promise for a key
   */
  getPending(key: string): Promise<AudioBuffer> | null {
    return this.pendingRequests.get(key) || null
  }

  /**
   * Set a pending request promise
   */
  setPending(key: string, promise: Promise<AudioBuffer>): void {
    this.pendingRequests.set(key, promise)

    // Clean up when promise resolves/rejects
    promise.finally(() => {
      this.pendingRequests.delete(key)
    })
  }
}

// Global cache instance
const audioBufferCache = new AudioBufferCache()

export { audioBufferCache }
