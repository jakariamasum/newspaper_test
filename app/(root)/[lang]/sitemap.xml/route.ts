import { ILanguage } from "@/types/language.types";
import { INews } from "@/types/news.types";
import { NextRequest, NextResponse } from "next/server";

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
      return data.data.map((lang: ILanguage) => lang.language_code);
    } else if (typeof data.data === "object" && data.data !== null) {
      const languageCodes = Object.values(data.data)
        .filter(
          (value): value is ILanguage =>
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

async function fetchNewsByLang(lang: string): Promise<INews[]> {
  try {
    const back_url = "https://newspaper-backend-eta.vercel.app/api/v1";

    const response = await fetch(`${back_url}/news?lang=${lang}`, {
      next: { revalidate: 3600 },
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Failed to fetch news for language ${lang}:`, error);
    return [];
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } }
): Promise<NextResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND;
  const lang = params.lang;

  const validLanguages = await fetchLanguages();
  if (!validLanguages.includes(lang)) {
    console.log(lang);
    return new NextResponse("Invalid language", { status: 404 });
  }

  const news = await fetchNewsByLang(lang);

  const sitemapEntries = [
    {
      url: `${baseUrl}/${lang}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/${lang}/news`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: "0.8",
    },
    ...news.map((item) => ({
      url: `${baseUrl}/${lang}/news/${item._id}`,
      lastmod: new Date(item.updatedAt).toISOString(),
      changefreq: "daily",
      priority: "0.7",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries
        .map(
          (entry) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastmod}</lastmod>
          <changefreq>${entry.changefreq}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
