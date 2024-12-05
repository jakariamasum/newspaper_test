"use client";
import { IAds } from "@/types/ads.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCompress } from "react-icons/fa";

interface AdDisplayProps {
  ads: IAds[];
  adId: string;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ads, adId }) => {
  const ad = ads.find((ad) => ad.id === adId);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("Finished loading");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFullScreenChange = () => {
      if (typeof window !== "undefined" && document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleImageClick = () => {
    if (typeof window !== "undefined" && imageContainerRef.current) {
      if (!document.fullscreenElement) {
        imageContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleExitFullScreenClick = () => {
    if (typeof window !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  if (!ad) {
    return null;
  }

  return (
    <div className="mb-2 block bg-white p-2">
      {ad.type === "images" ? (
        <div ref={imageContainerRef} className="relative">
          <Image
            key={ad.id}
            src={ad.content.image as string}
            width={728}
            height={90}
            alt={ad.id}
            className="w-full h-auto cursor-pointer"
            onClick={handleImageClick}
          />
          {isFullScreen && (
            <div
              className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
              onClick={handleExitFullScreenClick}
            >
              <FaCompress size={24} fill="blue" />
            </div>
          )}
        </div>
      ) : ad.type === "code" ? (
        <div
          key={ad.id}
          dangerouslySetInnerHTML={{ __html: ad.content || "" }}
        />
      ) : null}
    </div>
  );
};

export default AdDisplay;
