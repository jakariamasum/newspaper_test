"use client";

import { useSettings } from "@/app/context/settingContext";
import axiosPublic from "@/lib/axiosPublic";
import { ILanguage } from "@/types/language.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function DynamicTitle() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await axiosPublic.get("/language");
        setLanguages(response.data.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    if (settings?.title && languages.length > 0) {
      const languageCode = pathname.substring(1, 3).toLowerCase();
      const matchedLanguage = languages.find(
        (lang) => lang.language_code === languageCode
      );

      const titleName = matchedLanguage
        ? `${matchedLanguage.title} | ${settings.title}`
        : settings.title;
      document.title = titleName;
    }
  }, [pathname, settings, languages]);

  return null;
}
