"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LanguageInitializer() {
  const router = useRouter();

  useEffect(() => {
    const storedLang = sessionStorage.getItem("selectedLanguage");
    console.log(storedLang);
    if (storedLang) {
      document.documentElement.lang = storedLang;
      router.refresh();
    }
  }, [router]);

  return null;
}
