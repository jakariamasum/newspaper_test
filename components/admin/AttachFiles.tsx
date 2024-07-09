"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const AttachFiles: React.FC = () => {
  const [filePreviews, setFilePreviews] = useState<(string | ArrayBuffer)[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const newPreviews: (string | ArrayBuffer)[] = [];
      const maxFiles = 10;

      if (selectedFiles.length + filePreviews.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed.`);
        return;
      } else {
        setError(null);
      }

      Array.from(selectedFiles).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          // If the file is an image, display the image preview
          if (file.type.startsWith('image/')) {
            newPreviews.push(reader.result as string);
          } else {
            // For non-image files, display the file extension
            newPreviews.push(file.name);
          }

          setFilePreviews([...filePreviews, ...newPreviews]);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleCancelClick = (index: number) => {
    const newPreviews = [...filePreviews];
    newPreviews.splice(index, 1);
    setFilePreviews(newPreviews);
  };

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="fileInput" className="cursor-pointer flex items-center bg-white mt-2 px-3 py-2 space-x-2">
        <span>Attach Files</span>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M7.318.975a3.328 3.328 0 1 1 4.707 4.707l-5.757 5.757A1.914 1.914 0 1 1 3.56 8.732l5.585-5.586l.708.708l-5.586 5.585a.914.914 0 1 0 1.293 1.293l5.757-5.757a2.328 2.328 0 1 0-3.293-3.293L2.096 7.611a3.743 3.743 0 0 0 5.293 5.293l5.757-5.758l.708.708l-5.758 5.757A4.743 4.743 0 0 1 1.39 6.904z" clip-rule="evenodd"/></svg>
      </label>

      {error && <div className="text-red-500">{error}</div>}

      {filePreviews.length > 0 && (
        <div className="text-sm text-gray-600 w-full mt-4 mb-8">
          <b>File Previews:</b>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            {filePreviews.map((preview, index) => (
              <div key={index} className="flex items-center relative justify-center bg-gray-100 p-1">
                {typeof preview === 'string' ? (
                  preview.startsWith('data:image') ? (
                    <Image
                      src={preview as string}
                      width={50}
                      height={50}
                      alt="Preview"
                      className="h-24 w-full object-cover"
                    />
                  ) : (
                    <span>{preview}</span>
                  )
                ) : (
                  <span>{String(preview)}</span>
                )}
                <p
                  onClick={() => handleCancelClick(index)}
                    className="absolute text-red-500 right-1 top-1"
                >
                  X
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachFiles;