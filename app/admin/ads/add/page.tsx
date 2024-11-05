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
  {
    id: "detailsRelatedPostBottom",
    title: "Details Related Post Bottom",
    position: "details",
  },
  {
    id: "detailsPopularPostTop",
    title: "Details Popular Post Top",
    position: "details",
  },
  {
    id: "detailsPopularPostBottom",
    title: "Details Popular Post Bottom",
    position: "details",
  },
];

export type TAds = {
  _id: string;
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
  }>({});
  const [linkData, setLinkData] = useState<{ [key: string]: string }>({});
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [codeData, setCodeData] = useState<{ [key: string]: string }>({});
  const [existingAds, setExistingAds] = useState<TAds[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await axiosPublic.get("/ads");
        const adsData: TAds[] = response.data.data;
        setExistingAds(adsData);
        setLoading(false);

        const newSelectedOptions: { [key: string]: string } = {};
        const newLinkData: { [key: string]: string } = {};
        const newImageData: { [key: string]: string } = {};
        const newCodeData: { [key: string]: string } = {};

        adsData.forEach((ad) => {
          newSelectedOptions[ad.id] = ad.type;
          if (ad.type === "code") {
            newCodeData[ad.id] = ad.content as string;
          } else {
            newImageData[ad.id] = (
              ad.content as { image: string; link: string }
            ).image;
            newLinkData[ad.id] = (
              ad.content as { image: string; link: string }
            ).link;
          }
        });

        sections.forEach((section) => {
          if (!newSelectedOptions[section.id]) {
            newSelectedOptions[section.id] = "code";
            newCodeData[section.id] = "";
          }
        });

        setSelectedOptions(newSelectedOptions);
        setLinkData(newLinkData);
        setImageData(newImageData);
        setCodeData(newCodeData);
      } catch (error) {
        console.error("Failed to fetch ads data:", error);
        toast.error("Failed to load ads data.");
        setLoading(false);
      }
    };

    fetchAdsData();
  }, []);

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
      setIsSubmit(true);
      const data = sections.map((section) => ({
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

      if (adsToPublish.length === 0) {
        setIsSubmit(false);
        toast.warning("No valid ads to publish.");
        return;
      }

      const existingAdsResponse = await axiosPublic.get("/ads");
      const existingAds: TAds[] = existingAdsResponse.data.data;

      for (const ad of adsToPublish) {
        const existingAd = existingAds.find(
          (existing) => existing.id === ad.id
        );

        if (existingAd) {
          await axiosPublic.put(`/ads/admin/${existingAd._id}`, ad, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
        } else {
          await axiosPublic.post("/ads/admin", [ad], {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
        }
      }
      setIsSubmit(false);
      toast.success("Ads updated");
    } catch (error) {
      setIsSubmit(false);
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
            {sections
              .filter((section) => section.position === position)
              .map((section) => (
                <div key={section.id}>
                  <div className="flex items-center justify-between mt-2">
                    <p>{section.title}</p>
                    <select
                      className="px-2 max-w-sm outline-none"
                      value={selectedOptions[section.id] || "code"}
                      onChange={(e) =>
                        handleSelectChange(section.id, e.target.value)
                      }
                    >
                      <option value="code">Code</option>
                      <option value="images">Images</option>
                    </select>
                  </div>
                  {selectedOptions[section.id] === "code" ? (
                    <>
                      <textarea
                        rows={4}
                        placeholder="html code"
                        className="p-2 mt-2 w-full border border-main rounded"
                        value={codeData[section.id] || ""}
                        onChange={(e) =>
                          handleCodeChange(section.id, e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Photo
                        onChange={(img) => handleImageChange(section.id, img)}
                        img={imageData[section.id] || ""}
                        title={""}
                      />
                      <input
                        type="text"
                        placeholder="Link"
                        className="p-2 mt-2 w-full border border-main rounded"
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

      <div className="flex justify-end mt-4">
        <button
          onClick={handlePublish}
          className="bg-main text-white p-2 rounded-md hover:bg-darkMain"
        >
          {isSubmit ? "Publishing..." : "Publish"}
        </button>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default IndexPage;
