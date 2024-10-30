"use server";

export async function uploadToCloudinary(dataUrl: string) {
  try {
    // Convert data URL to Blob
    const base64Data = dataUrl.split(",")[1];
    const mimeType = dataUrl.split(";")[0].split(":")[1];
    const binaryData = Buffer.from(base64Data, "base64");

    // Check file size (1MB = 1048576 bytes)
    if (binaryData.length > 1048576) {
      throw new Error("FILE_TOO_LARGE");
    }

    // Create FormData with required Cloudinary parameters
    const formData = new FormData();
    const blob = new Blob([binaryData], { type: mimeType });
    formData.append("file", blob);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ""
    );
    formData.append(
      "timestamp",
      String(Math.round(new Date().getTime() / 1000))
    );

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("CLOUDINARY_CONFIG_MISSING");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary error:", errorData);
      throw new Error(errorData.error?.message || "UPLOAD_FAILED");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
