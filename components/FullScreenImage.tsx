"use client";

import { useState } from "react";
import Image from "next/image";
import { FaExpand } from "react-icons/fa";

interface FullscreenImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function FullscreenImage({
  src,
  alt,
  width,
  height,
}: FullscreenImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenFullImage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(src, "_blank");
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        className="rounded-lg"
      />
      {isHovered && (
        <a
          href={src}
          onClick={handleOpenFullImage}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200"
          aria-label="View full image"
        >
          <FaExpand size={24} className="text-white" />
        </a>
      )}
    </div>
  );
}
