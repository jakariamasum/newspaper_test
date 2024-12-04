"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/app/context/langContext";
import axiosPublic from "@/lib/axiosPublic";
import { ILanguage } from "@/types/language.types";

export const LanguageSelector = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const { setLang } = useLang();
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  console.log(languages);
  useEffect(() => {
    if (typeof document === "undefined") return;
  }, []);
  useEffect(() => {
    const storedLang = sessionStorage.getItem("selectedLanguage");
    if (storedLang) {
      setCurrentLang(storedLang);
    }
    const fetchLanguages = async () => {
      const response = await axiosPublic.get("/language");
      setLanguages(response.data.data);
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (typeof document === "undefined") return;

    const newLang = e.target.value;
    sessionStorage.setItem("selectedLanguage", newLang);
    setLang(newLang);
    document.documentElement.lang = newLang;
    setCurrentLang(newLang);
    router.push("/" + newLang);
  };

  return (
    <select
      onChange={handleLanguageChange}
      value={currentLang}
      className=" text-black "
      aria-label="Select language"
    >
      <option value="">Home</option>
      {languages?.map((lang) => (
        <option key={lang?._id} value={lang?.language_code}>
          {lang?.language_code?.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  );
};
