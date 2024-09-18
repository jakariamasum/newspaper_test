"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaExpand } from "react-icons/fa";

const GalleryPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const image = urlParams.get("image");

    setImageSrc(decodeURIComponent(image || "/default.jpg"));
  }, []);

  const handleFullScreenClick = () => {
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

  if (!imageSrc) {
    return <p>Loading image...</p>;
  }

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-slate-50"
      ref={imageContainerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={imageSrc}
        alt="Selected Image"
        width={800}
        height={600}
        className="max-w-full max-h-full object-contain"
      />

      {isHovering && (
        <div
          className="absolute top-4 right-4 text-black text-4xl cursor-pointer"
          onClick={handleFullScreenClick}
        >
          <FaExpand />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
