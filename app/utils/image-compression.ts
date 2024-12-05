"use client";
import { useEffect } from "react";

export async function compressImage(
  dataUrl: string,
  maxSizeMB: number = 1,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    useEffect(() => {
      console.log("Finished loading");
    }, []);
    useEffect(() => {
      if (typeof window === "undefined") return;
    }, []);
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      let { width, height } = img;
      const maxDimension = 1920;

      if (width > height && width > maxDimension) {
        height *= maxDimension / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width *= maxDimension / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Get compressed data URL
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

      // Check if size is still too large
      const base64Data = compressedDataUrl.split(",")[1];
      const binaryData = atob(base64Data);
      const sizeInMB = binaryData.length / (1024 * 1024);

      if (sizeInMB > maxSizeMB && quality > 0.1) {
        resolve(compressImage(dataUrl, maxSizeMB, quality - 0.1));
      } else {
        resolve(compressedDataUrl);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = dataUrl;
  });
}
