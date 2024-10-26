"use client";

import { useLang } from "@/app/context/langContext";
import { useSettings } from "@/app/context/settingContext";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";

type TLanguage = {
  copyright: string;
  orderPolicy: string;
  privacy: string;
  terms: string;
  htmlBoxes: string[];
};

const Footer: React.FC = () => {
  const { settings } = useSettings();
  const [langDetails, setLangDetails] = useState<TLanguage>();
  const { lang } = useLang();

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await axiosPublic.get(`/language?lang=${lang}`);
        setLangDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };
    fetchLanguage();
  }, [lang]);

  return (
    <>
      {settings?.footer === "1" && (
        <footer className="bg-main text-white py-6 mt-2">
          <div className="container mx-auto px-4">
            {langDetails?.htmlBoxes && langDetails.htmlBoxes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {langDetails.htmlBoxes.map((html, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg bg-white bg-opacity-10 p-4"
                  >
                    <div
                      className="prose prose-sm prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                {langDetails?.copyright ||
                  "Copyright © 2024 Newspaper. All rights reserved."}
              </div>
              <nav className="flex flex-wrap gap-4 md:justify-end md:items-center">
                <Link href="/privacy-policies" className="hover:underline">
                  {langDetails?.privacy || "Privacy Policies"}
                </Link>
                <Link href="/terms-and-conditions" className="hover:underline">
                  {langDetails?.terms || "Terms and Conditions"}
                </Link>
                <Link href="/order-policies" className="hover:underline">
                  {langDetails?.orderPolicy || "Order Policies"}
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      )}
      {settings?.footer !== "1" && (
        <p className="text-center py-4">Design coming soon......</p>
      )}
    </>
  );
};

export default Footer;
