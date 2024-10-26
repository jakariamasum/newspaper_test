"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useSettings } from "../context/settingContext";
import { useLang } from "../context/langContext";
import axiosPublic from "@/lib/axiosPublic";

type TLanguage = {
  _id: string;
  title: string;
  language_code: string;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings } = useSettings();
  const { setLang, lang } = useLang();
  const [language, setLanguage] = useState<TLanguage[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [showOptions, setShowOptions] = useState(true);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLangFromPath = () => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const possibleLang = pathParts[0];
      if (language.some((lang) => lang.language_code === possibleLang)) {
        if (isClient) {
          sessionStorage.setItem("selectedLanguage", possibleLang);
        }
        setLang(possibleLang);
        return possibleLang;
      }
    }
    return null;
  };

  useEffect(() => {
    if (isClient) {
      const savedLang = sessionStorage.getItem("selectedLanguage");
      const langFromPath = getLangFromPath();

      if (
        savedLang &&
        settings?.content !== "off" &&
        savedLang === settings?.content
      ) {
        setLang(savedLang as string);
      } else if (langFromPath && settings?.content) {
        setLang(langFromPath);
        sessionStorage.setItem("selectedLanguage", langFromPath);
      } else if (settings?.content && settings?.content !== "off") {
        setLang(settings.content);
        sessionStorage.setItem("selectedLanguage", settings.content);
      } else if (settings?.content === "off") {
        sessionStorage.removeItem("selectedLanguage");
      }
    }
  }, [isClient, settings?.content, setLang, pathname]);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await axiosPublic.get(`/language`);
        const activeLanguages = response.data.data.filter(
          (lang: any) => lang.status === "active"
        );
        setLanguage(activeLanguages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    if (settings?.content !== undefined) {
      setIsSettingsLoaded(true);
    }
  }, [settings?.content]);

  useEffect(() => {
    if (isClient && isSettingsLoaded) {
      const savedLang = sessionStorage.getItem("selectedLanguage");
      const langFromPath = getLangFromPath();

      if (langFromPath) {
        setLang(langFromPath);
        document.documentElement.lang = langFromPath;
        sessionStorage.setItem("selectedLanguage", langFromPath);
      } else if (pathname === "/" && savedLang) {
        setLoading(true);
        setLang(savedLang);
        router.push(`/${savedLang}`);
        document.documentElement.lang = savedLang;
        setLoading(false);
      }
    }
  }, [isClient, isSettingsLoaded, pathname, setLang, router]);

  const handleCardClick = (languageCode: string) => {
    setShowOptions(false);
    setLang(languageCode);
    if (isClient) {
      sessionStorage.setItem("selectedLanguage", languageCode);
    }
    document.documentElement.lang = languageCode;
    router.push(`/${languageCode}`);
  };

  if (loading || !isSettingsLoaded) {
    return <Loader />;
  }

  if (settings?.content === "off" && showOptions && pathname === "/") {
    return (
      <main>
        <div className="flex justify-center mt-2">
          <Image
            src={settings?.logo || "/logo.svg"}
            width={150}
            height={45}
            alt="logo"
            className="outline-0"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {language?.map((lang) => (
            <div
              key={lang._id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(lang.language_code)}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">🌐</div>
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {lang.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header top={1} header={1} menu={1} />
      {children}
      <Footer />
    </main>
  );
}
