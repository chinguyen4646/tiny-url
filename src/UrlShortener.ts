import Redis from "ioredis";

class UrlShortener {
  private static redis: Redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",  
    port: 6379, // Default redis port (which we can use locally)
  });

  constructor() {
    // Add connection event listeners
    UrlShortener.redis.on("connect", () => {
      console.log("Connected to Redis server");
    });

    UrlShortener.redis.on("error", (err: Error) => {
      console.error("Redis error: ", err);
    });

    UrlShortener.redis.on("reconnecting", () => {
      console.log("Reconnecting to Redis server...");
    });

    UrlShortener.redis.on("end", () => {
      console.log("Disconnected from Redis server");
    });
  }

  public generateCode(): string {
    // "0.5Yb1yx" substr removes leading 0.
    const code = Math.random().toString(36).substr(2, 8);
    let result = "";

    for (const char of code) {
      // For each character, randomly decide whether to uppercase it.
      result += Math.random() < 0.5 ? char.toUpperCase() : char;
    }

    return result;
  }

  public async shortenUrl(url: string): Promise<string | null> {
    // Use url to see if code already exists.
    let code = await UrlShortener.redis.get(url);

    // If code already exists use pre-existing code to create short url and return.
    if (code) {
      return this.createShortUrl(code);
    }

    // If not then create a new code.
    code = this.generateCode();

    // Check if new code is not duplicated (if it is then create another one)
    while (await UrlShortener.redis.get(code)) {
      code = this.generateCode();
    }

    // Create isomorphic relationship between code and url.
    await UrlShortener.redis.set(code, url);
    await UrlShortener.redis.set(url, code);

    // Return short url using newly created code.
    return this.createShortUrl(code);
  }

  private createShortUrl(code: string): string {
    return process.env.NEXT_PUBLIC_API_URL + "/" + code;
  }

  public async getOriginalUrl(code: string): Promise<string | null> {
    // Returns the original url from short url using the code
    return await UrlShortener.redis.get(code);
  }
}

export default UrlShortener;
