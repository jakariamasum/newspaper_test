import "./globals.css";
import { AuthProvider } from "./context/authContext";
import { LangProvider } from "./context/langContext";
import { SettingsProvider } from "./context/settingContext";
import DynamicTitle from "@/components/DynamicTitle";
import { Metadata, Viewport } from "next";
import axiosPublic from "@/lib/axiosPublic";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();

  const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND!),
    title: {
      default: settings?.title || "Default Title",
      template: `%s | ${settings?.title || "Default Title"}`,
    },
    description: settings?.description || "Default description",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      siteName: settings?.title,
      title: settings?.title || "Default Title",
      description: settings?.description || "Default description",
      images: [
        {
          url: settings?.image || "/default-og-image.png",
          width: 1200,
          height: 630,
          alt: settings?.title || "Default Title",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      // site: '@newspaper',
      title: settings?.title || "Default Title",
      description: settings?.description || "Default description",
      images: [settings?.image || "/default-og-image.png"],
    },
    other: {
      // "fb:app_id": "123456789",
      "og:locale": "en_US",
      "pinterest:description": settings?.description || "Default description",
      "pinterest:image": settings?.image || "/default-og-image.png",
      "whatsapp:title": settings?.title || "Default Title",
      "whatsapp:description": settings?.description || "Default description",
      "whatsapp:image": settings?.image || "/default-og-image.png",
    },
  };

  return metadata;
}

async function fetchSettings() {
  try {
    const settings = await axiosPublic.get("/settings");

    return {
      title: settings?.data?.data[0]?.title,
      description: settings?.data?.data[0]?.description,
      image: "/default-og-image.png",
    };
  } catch (error) {
    console.log(error);
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <SettingsProvider>
          <DynamicTitle />
          <AuthProvider>
            <LangProvider>{children}</LangProvider>
          </AuthProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
