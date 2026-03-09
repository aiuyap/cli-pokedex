export type CacheEntry<T> = {
  createdAt: number,
  val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val
    });
  }
  
  get(key: string) {
    const cache = this.#cache.get(key);
    if (!cache) return undefined;

    if (Date.now() - cache.createdAt >= this.#interval) {
      this.#cache.delete(key);
      return undefined;
    }

    return cache.val;
  }

  #reap() {
    const now = Date.now();
    for (const [key, value] of this.#cache) {
      if (now - value.createdAt >= this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}