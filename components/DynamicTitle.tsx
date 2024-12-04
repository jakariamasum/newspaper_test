"use client";

import { useSettings } from "@/app/context/settingContext";
import axiosPublic from "@/lib/axiosPublic";
import { ILanguage } from "@/types/language.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface INews {
  _id: string;
  title: string;
}

interface ICategory {
  _id: string;
  title: string;
}

export function DynamicTitle() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [newsTitle, setNewsTitle] = useState<string>("");
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  useEffect(() => {
    if (typeof document === "undefined") return;
  }, []);

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
    const fetchTitleData = async () => {
      const pathParts = pathname.split("/");
      if (pathParts.length >= 4) {
        const lang = pathParts[1];
        const type = pathParts[2];
        const id = pathParts[3];

        if (type === "news") {
          try {
            const response = await axiosPublic.get<{ data: INews }>(
              `/news/each-news/${id}`
            );
            setNewsTitle(response.data.data.title);
          } catch (error) {
            console.error("Error fetching news title:", error);
          }
        } else if (type === "categories") {
          try {
            const response = await axiosPublic.get<{ data: ICategory }>(
              `/categories/${id}`
            );
            setCategoryTitle(response.data.data.title);
          } catch (error) {
            console.error("Error fetching category title:", error);
          }
        }
      }
    };

    fetchTitleData();
  }, [pathname]);

  useEffect(() => {
    if (settings?.title && languages.length > 0) {
      const pathParts = pathname.split("/");
      const languageCode = pathParts[1].toLowerCase();
      const matchedLanguage = languages.find(
        (lang) => lang.language_code === languageCode
      );

      let titleName = settings.title;

      if (pathParts.length >= 4) {
        const type = pathParts[2];
        if (type === "news" && newsTitle) {
          titleName = `${newsTitle} | ${matchedLanguage?.title || ""} | ${
            settings.title
          }`;
        } else if (type === "categories" && categoryTitle) {
          titleName = `${categoryTitle} | ${matchedLanguage?.title || ""} | ${
            settings.title
          }`;
        } else if (matchedLanguage) {
          titleName = `${matchedLanguage.title} | ${settings.title}`;
        }
      } else if (matchedLanguage) {
        titleName = `${matchedLanguage.title} | ${settings.title}`;
      }

      document.title = titleName;
    }
  }, [pathname, settings, languages, newsTitle, categoryTitle]);

  return null;
}
