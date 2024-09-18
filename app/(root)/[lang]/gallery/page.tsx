"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaCompress } from "react-icons/fa";

const GalleryPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const image = urlParams.get("image");

    setImageSrc(decodeURIComponent(image || "/default.jpg"));
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
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
    if (imageContainerRef.current) {
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
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  if (!imageSrc) {
    return <p>Loading image...</p>;
  }

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-slate-50"
      ref={imageContainerRef}
    >
      <Image
        src={imageSrc}
        alt="Selected Image"
        width={800}
        height={600}
        className="max-w-full max-h-full object-contain cursor-pointer"
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
  );
};

export default GalleryPage;
