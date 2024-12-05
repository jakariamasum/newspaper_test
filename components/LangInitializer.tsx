"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LanguageInitializer() {
  const router = useRouter();
  useEffect(() => {
    console.log("Finished loading");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);
  useEffect(() => {
    const storedLang = sessionStorage.getItem("selectedLanguage");
    console.log(storedLang);
    if (typeof window !== "undefined" && storedLang) {
      document.documentElement.lang = storedLang;
      router.refresh();
    }
  }, [router]);

  return null;
}
