"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface PhotoProps {
  title: string;
  img?: string;
  onChange: (img: string) => void;
}

const Photo: React.FC<PhotoProps> = ({ title, img, onChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    img || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target.value);
    onChange(event.target.value);
    console.log(event.target.value);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
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
          htmlFor="photoInput"
          className="cursor-pointer w-full flex items-center justify-center"
        >
          {selectedImage ? (
            <Image
              src={selectedImage}
              width={600}
              height={600}
              alt="Selected"
              className="bg-white p-2 max-w-full max-h-96 object-contain"
              unoptimized // optionally, to skip next/image optimizations
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
              </div>
            </div>
          )}
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        {selectedImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute right-1 top-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            X
          </button>
        )}
      </div>
      <input
        type="url"
        placeholder="Enter image URL"
        className="p-2 outline-0 w-full border border-gray-300 rounded"
        value={selectedImage || ""}
        onChange={handleImageUrlChange}
      />
    </div>
  );
};

export default Photo;
