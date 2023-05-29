import { isValidDomain, isValidShortUrl } from "../../helpers/urlHelpers";

describe("isValidDomain", () => {
  test("Should return true for a valid domain", () => {
    const validDomains = [
      "subdomain.cronofy.com",
      "cronofy.co.uk",
      "cronofy.com",
      "cronofy.io",
      "www.cronofy.io",
      "https://cronofy.io",
      "http://cronofy.io/",
      "http://subdomain.cronofy.io/",
      "https://subdomain.cronofy.io/",
    ];

    for (const domain of validDomains) {
      expect(isValidDomain(domain)).toBe(true);
    }
  });

  test("Should return false for an invalid domain", () => {
    const invalidDomains = [
      "cronofy",
      "123cronofy.io",
      "cronofy-.io",
      "https://cronofy--!.io",
      "fps://cronofy.io",
      "htt://cronofy--!.io",
      "https:/cronofy.io",
      "https:cronofy.io",
      "https//cronofy.io",
    ];

    for (const domain of invalidDomains) {
      expect(isValidDomain(domain)).toBe(false);
    }
  });

  test("Should return false for an empty URL", () => {
    expect(isValidDomain("")).toBe(false);
  });

  test("Should return false for a non-trimmed URL", () => {
    expect(isValidDomain("   cronofy.com   ")).toBe(false);
  });
});

describe("isValidShortUrl", () => {
  let baseDomain: string;

  beforeEach(() => {
    baseDomain = `${process.env.NEXT_PUBLIC_API_URL}`;
  });

  it("Should return true for a valid short URL", () => {
    const validUrl = `${baseDomain}/ABCD1234`;
    expect(isValidShortUrl(validUrl)).toBe(true);
  });

  it("Should return true for a URL without the correct protocol", () => {
    const urlWithoutProtocol = "localhost:3000/ABCD1234";
    expect(isValidShortUrl(urlWithoutProtocol)).toBe(true);
  });

  it("Should return false for an empty URL", () => {
    const emptyUrl = "";
    expect(isValidShortUrl(emptyUrl)).toBe(false);
  });

  it("Should return false for a URL without path", () => {
    const urlWithoutDomain = `${baseDomain}`;
    expect(isValidShortUrl(urlWithoutDomain)).toBe(false);
  });

  it("Should return false for a URL with an invalid base domain", () => {
    const urlWithInvalidDomain = "http://example.com/ABCD1234";
    expect(isValidShortUrl(urlWithInvalidDomain)).toBe(false);
  });

  it("Should return false for a URL with an invalid path length", () => {
    const urlWithInvalidPath = `${baseDomain}/ABCD`;
    expect(isValidShortUrl(urlWithInvalidPath)).toBe(false);
  });

  it("Should return false for a URL with an invalid path format", () => {
    const urlWithInvalidPathFormat = `${baseDomain}/ABCD!@#$`;
    expect(isValidShortUrl(urlWithInvalidPathFormat)).toBe(false);
  });
});
