"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axiosPublic from "@/lib/axiosPublic";

interface LanguageFormData {
  title: string;
  language_code: string;
  link: string;
}

export default function LanguageInputForm() {
  const router = useRouter();
  const [language, setLanguage] = useState<LanguageFormData>({
    title: "",
    language_code: "",
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLanguage((prev) => ({
      ...prev,
      [name]: name === "language_code" ? value : value,
      link: name === "language_code" ? `/${value.toLowerCase()}` : prev.link,
    }));
  };

  const handleCreateLanguage = async (e: FormEvent) => {
    e.preventDefault();
    if (!language.title || !language.language_code) {
      toast.error("Please fill in both fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosPublic.post("/language/admin", language, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Successfully created language!");
        router.push("/admin/type");
      } else {
        toast.error("Failed to create language");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create language");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Language
      </h2>
      <form onSubmit={handleCreateLanguage} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={language.title}
            onChange={handleInputChange}
            placeholder="e.g. English"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition duration-200"
            required
          />
        </div>
        <div>
          <label
            htmlFor="language_code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language Code
          </label>
          <input
            id="language_code"
            name="language_code"
            type="text"
            value={language.language_code}
            onChange={handleInputChange}
            placeholder="e.g. en"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition duration-200"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-main text-white py-3 px-4 rounded-md hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
}
