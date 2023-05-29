import UrlShortener from "../UrlShortener";
import Redis from "ioredis";

// Mock the Redis instance
jest.mock("ioredis");
const mockedRedis = Redis as jest.MockedClass<typeof Redis>;

describe("UrlShortener", () => {
  let urlShortener: UrlShortener;

  beforeEach(() => {
    urlShortener = new UrlShortener();
    mockedRedis.mockClear();
  });

  describe("generateCode", () => {
    it("Should generate a random code", () => {
      const code = urlShortener.generateCode();
      expect(code).toMatch(/^[a-zA-Z0-9]{8}$/);
    });
  });

  describe("shortenUrl", () => {
    it("Should return an existing code if URL already shortened", async () => {
      const existingUrl = "https://www.cronofy.com";
      const existingCode = "ABCD1234";
      mockedRedis.prototype.get.mockResolvedValue(existingCode);

      const result = await urlShortener.shortenUrl(existingUrl);
      const shortenedUrl = `${process.env.NEXT_PUBLIC_API_URL}/${existingCode}`;

      expect(result).toBe(shortenedUrl);
      expect(mockedRedis.prototype.get).toHaveBeenCalledWith(existingUrl);
      expect(mockedRedis.prototype.set).not.toHaveBeenCalled();
    });

    it("Should generate a new code if URL not yet shortened", async () => {
      const newUrl = "https://www.cronofy.com";
      const newCode = "WXYZ5678";
      mockedRedis.prototype.get.mockResolvedValue(null); // Mocks code not returning anything.
      mockedRedis.prototype.set.mockResolvedValue("OK"); // "OK" mocks ioredis successful operation.

      // Mock the generateCode method to return the specific code
      jest.spyOn(urlShortener, "generateCode").mockReturnValue(newCode);

      const result = await urlShortener.shortenUrl(newUrl);
      const shortenedUrl = `${process.env.NEXT_PUBLIC_API_URL}/${newCode}`;

      expect(result).toBe(shortenedUrl);
      expect(mockedRedis.prototype.get).toHaveBeenCalledWith(newUrl);
      expect(mockedRedis.prototype.set).toHaveBeenCalledWith(newCode, newUrl);
      expect(mockedRedis.prototype.set).toHaveBeenCalledWith(newUrl, newCode);
    });
  });

  describe("getOriginalUrl", () => {
    it("Should return the original URL for a given code", async () => {
      const code = "ABCD1234";
      const originalUrl = "https://www.cronofy.com";
      mockedRedis.prototype.get.mockResolvedValue(originalUrl);

      const result = await urlShortener.getOriginalUrl(code);

      expect(result).toBe(originalUrl);
      expect(mockedRedis.prototype.get).toHaveBeenCalledWith(code);
    });
  });
});
