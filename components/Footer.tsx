"use client";
import { useLang } from "@/app/context/langContext";
import axiosPublic from "@/lib/axiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";
type TLanguage = {
  copyright: string;
  orderPolicy: string;
  privacy: string;
  terms: string;
};
const Footer: React.FC = () => {
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
  }, []);

  return (
    <>
      <div className="bg-main text-white py-2 mt-2">
        <div className="container">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div>
              {langDetails?.copyright ||
                "Copyright © 2024 Newspaper. All rights reserved."}
            </div>
            <div className="flex space-x-2 md:justify-end md:items-center">
              <Link href="/privacy-policies">
                {langDetails?.privacy || "Privacy Policies"}
              </Link>
              <Link href="/terms-and-conditions">
                {langDetails?.terms || "Terms and Conditions"}
              </Link>
              <Link href="/order-policies">
                {langDetails?.orderPolicy || "Order Policies"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
