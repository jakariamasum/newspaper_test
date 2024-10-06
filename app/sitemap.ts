import { MetadataRoute } from "next";

interface Language {
  language_code: string;
}

async function fetchLanguages(): Promise<string[]> {
  try {
    const back_url = "https://newspaper-backend-eta.vercel.app/api/v1";
    const response = await fetch(`${back_url}/language`, {
      next: { revalidate: 3600 },
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data.data)) {
      return data.data.map((lang: Language) => lang.language_code);
    } else if (typeof data === "object" && data !== null) {
      const languageCodes = Object.values(data)
        .filter(
          (value): value is Language =>
            typeof value === "object" &&
            value !== null &&
            "language_code" in value
        )
        .map((lang) => lang.language_code);

      if (languageCodes.length > 0) {
        return languageCodes;
      }
    }

    console.log("Unexpected data format from /language endpoint:", data);
    return ["en"];
  } catch (error) {
    console.error("Failed to fetch languages:", error);
    return ["en"];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://newspaper-mocha.vercel.app";

  const languages = await fetchLanguages();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...languages.map((lang) => ({
      url: `${baseUrl}/api/sitemap/${lang}`,
      lastModified: new Date(),
    })),
  ];
}
