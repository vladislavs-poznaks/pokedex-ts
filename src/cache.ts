export type CacheEntry<T> = {
    createdAt: number;
    value: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>
    #reapIntervalId: NodeJS.Timeout | undefined = undefined
    #interval: number

    constructor(interval: number) {
        this.#interval = interval

        this.#startReapLoop()
    }

    add<T>(key: string, value: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            value
        }

        this.#cache.set(key, entry)
    }

    get<T>(key: string): T | undefined {
        const entry: CacheEntry<T> | undefined = this.#cache.get(key)

        if (entry) {
            return entry.value as T
        }

        return undefined
    }

    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId)

            this.#reapIntervalId = undefined
        }
    }

    #reap(): void {
        const now = Date.now()

        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < now - this.#interval) {
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setTimeout(() => this.#reap(), this.#interval)
    }
}