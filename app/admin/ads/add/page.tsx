"use client";
import React, { useState, useEffect } from "react";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { toast, Toaster } from "sonner";

interface Section {
  id: string;
  title: string;
  position: string;
}

const sections: Section[] = [
  { id: "headerTop", title: "Header Top", position: "header" },
  { id: "headerBottom", title: "Header Bottom", position: "header" },
  { id: "headerLeft", title: "Header Left", position: "header" },
  { id: "headerRight", title: "Header Right", position: "header" },
  { id: "categoryTop", title: "Category Top", position: "category" },
  { id: "categoryBottom", title: "Category Bottom", position: "category" },
  { id: "categoryLeft", title: "Category Left", position: "category" },
  { id: "categoryRight", title: "Category Right", position: "category" },
  { id: "detailsTitleTop", title: "Details Title Top", position: "details" },
  {
    id: "detailsTitleBottom",
    title: "Details Title Bottom",
    position: "details",
  },
  { id: "detailsImagesTop", title: "Details Images Top", position: "details" },
  {
    id: "detailsImagesBottom",
    title: "Details Images Bottom",
    position: "details",
  },
  {
    id: "detailsDescriptionTop",
    title: "Details Description Top",
    position: "details",
  },
  {
    id: "detailsDescriptionCentre",
    title: "Details Description Centre",
    position: "details",
  },
  {
    id: "detailsDescriptionBottom",
    title: "Details Description Bottom",
    position: "details",
  },
  {
    id: "detailsRelatedPostTop",
    title: "Details Related Post Top",
    position: "details",
  },
  {
    id: "detailsRelatedPostBottom",
    title: "Details Related Post Bottom",
    position: "details",
  },
];

export type TAds = {
  id: string;
  position: "header" | "category" | "details";
  type: "code" | "images";
  content:
    | string
    | {
        image: string;
        link: string;
      };
};

const IndexPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>(
    sections.reduce((acc, section) => {
      acc[section.id] = "code";
      return acc;
    }, {} as { [key: string]: string })
  );
  const [linkData, setLinkData] = useState<{ [key: string]: string }>({});
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [codeData, setCodeData] = useState<{ [key: string]: string }>({});
  const [existingAds, setExistingAds] = useState<TAds[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await axiosPublic.get("/ads");
        const adsData: TAds[] = response.data.data;
        setExistingAds(adsData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch ads data:", error);
        toast.error("Failed to load ads data.");
        setLoading(false);
      }
    };

    fetchAdsData();
  }, []);

  const availableSections = sections.filter(
    (section) => !existingAds.some((ad) => ad.id === section.id)
  );

  const handleSelectChange = (id: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLinkChange = (id: string, value: string) => {
    setLinkData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (id: string, img: string) => {
    setImageData((prev) => ({
      ...prev,
      [id]: img,
    }));
  };

  const handleCodeChange = (id: string, value: string) => {
    setCodeData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePublish = async () => {
    try {
      const data = availableSections.map((section) => ({
        id: section.id,
        position: section.position,
        type: selectedOptions[section.id],
        content:
          selectedOptions[section.id] === "code"
            ? codeData[section.id] || ""
            : {
                image: imageData[section.id] || "",
                link: linkData[section.id] || "",
              },
      }));

      const adsToPublish = data.filter((ad) => {
        if (ad.type === "code") {
          return ad.content !== "";
        } else if (ad.type === "images" && typeof ad.content === "object") {
          const content = ad.content as { image: string; link: string };
          return content.image !== "" || content.link !== "";
        }
        return false;
      });

      await axiosPublic.post("/ads/admin", adsToPublish, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      toast.success("Ads Published successfully!");
    } catch (error) {
      console.error("Failed to publish:", error);
      toast.warning("Failed to publish.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-4 container">
      <h1 className="text-xl font-bold mb-4">Advertisement</h1>

      {["header", "category", "details"].map((position) => (
        <div key={position}>
          <h1 className="text-md border-y border-dashed border-main font-semibold mt-2">
            {position.charAt(0).toUpperCase() + position.slice(1)}
          </h1>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
            {availableSections
              .filter((section) => section.position === position)
              .map((section) => (
                <div key={section.id}>
                  <div className="flex items-center justify-between mt-2">
                    <p>{section.title}</p>
                    <select
                      className="px-2 max-w-sm outline-none"
                      value={selectedOptions[section.id]}
                      onChange={(e) =>
                        handleSelectChange(section.id, e.target.value)
                      }
                    >
                      <option value="code">Code</option>
                      <option value="images">Images</option>
                    </select>
                  </div>
                  {selectedOptions[section.id] === "code" ? (
                    <textarea
                      rows={4}
                      placeholder="html code"
                      className="p-2 mt-2 w-full outline-none rounded-md"
                      value={codeData[section.id] || ""}
                      onChange={(e) =>
                        handleCodeChange(section.id, e.target.value)
                      }
                    />
                  ) : (
                    <>
                      <Photo
                        title="Photo (600x600px)"
                        img={imageData[section.id] || ""}
                        onChange={(img) => handleImageChange(section.id, img)}
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        className="p-2 mt-2 w-full outline-none rounded-md"
                        value={linkData[section.id] || ""}
                        onChange={(e) =>
                          handleLinkChange(section.id, e.target.value)
                        }
                      />
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      <button
        onClick={handlePublish}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Publish
      </button>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default IndexPage;
