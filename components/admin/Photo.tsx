"use client";

import { compressImage } from "@/app/utils/image-compression";
import { uploadToCloudinary } from "@/app/utils/uploadToCloudinary";
import Image from "next/image";
import React, { useState, useEffect, useId } from "react";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";

interface PhotoProps {
  title: string;
  img?: string;
  onChange: (img: string) => void;
}

export default function Photo({ title, img, onChange }: PhotoProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    img || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputId = useId();
  useEffect(() => {
    console.log("Finished loading");
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof window === "undefined") return;

    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      // Create initial data URL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Show preview immediately
      setSelectedImage(dataUrl);

      // Compress image
      const compressedImage = await compressImage(dataUrl);

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(compressedImage);
      setSelectedImage(cloudinaryUrl);
      onChange(cloudinaryUrl);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      let errorMessage = "Failed to upload image";

      if (error instanceof Error) {
        switch (error.message) {
          case "FILE_TOO_LARGE":
            errorMessage = "Image is too large. Please try a smaller image.";
            break;
          case "CLOUDINARY_CONFIG_MISSING":
            errorMessage =
              "Cloudinary configuration is missing. Please check your environment variables.";
            break;
          case "UPLOAD_FAILED":
            errorMessage =
              "Upload failed. Please check your Cloudinary credentials and try again.";
            break;
          default:
            errorMessage = error.message;
        }
      }

      setUploadError(errorMessage);
      toast.error(errorMessage);

      // Revert to previous image if it exists, or clear if it doesn't
      setSelectedImage(img || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setSelectedImage(url);
    onChange(url);
    setUploadError(null);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onChange("");
    setUploadError(null);
  };

  useEffect(() => {
    if (img) {
      setSelectedImage(img);
    }
  }, [img]);

  return (
    <div className="w-full">
      <p className="flex items-center justify-between">
        <span>{title}</span>
        <span>{selectedImage ? "Image selected" : ""}</span>
      </p>
      <div className="flex flex-col items-center my-2 relative">
        <label
          htmlFor={inputId}
          className="cursor-pointer w-full flex items-center justify-center"
        >
          {isUploading ? (
            <div className="p-4 bg-white w-full flex flex-col items-center justify-center gap-2">
              <LuLoader2 className="h-8 w-8 animate-spin text-gray-500" />
              <p className="text-sm text-gray-500">
                Compressing and uploading...
              </p>
            </div>
          ) : selectedImage ? (
            <Image
              src={selectedImage}
              width={600}
              height={600}
              alt="Selected"
              className="bg-white p-2 max-w-full max-h-96 object-contain"
              unoptimized
            />
          ) : (
            <div className="p-4 bg-white w-full">
              <div className="border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-6-6h12"
                  />
                </svg>
                <p>Click to upload</p>
                <p className="text-sm text-gray-400 mt-2">Maximum size: 1MB</p>
              </div>
            </div>
          )}
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </label>
        {selectedImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute right-1 top-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isUploading}
          >
            X
          </button>
        )}
      </div>
      {uploadError && (
        <p className="text-sm text-red-500 mt-2">{uploadError}</p>
      )}
      <input
        type="url"
        placeholder="Enter image URL"
        className="p-2 outline-0 w-full border border-gray-300 rounded"
        value={selectedImage || ""}
        onChange={handleImageUrlChange}
        disabled={isUploading}
      />
    </div>
  );
}
