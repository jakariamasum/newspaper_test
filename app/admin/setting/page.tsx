"use client";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
interface ILanguage {
  _id: string;
  language_code: string;
}

interface TSetting {
  metaDescription: string;
  description: string;
  privacy: string;
  terms: string;
  orderPolicy: string;
  logo: string;
  favicon: string;
  lotoImg: string;
  metaImg: string;
  title: string;
  bgColor: string;
  country: string;
  currencySymbol: string;
  copyright: string;
  priceZero: string;
  highlights: string;
  shipInside: string;
  shipOutside: string;
  deliveryMethod1: string;
  deliveryMethod2: string;
  pickupMethod1: string;
  pickupMethod2: string;
  paymentMethod: string;
  paymentText1: string;
  paymentText2: string;
  officeAddress: string;
  whatsApp: number;
  telegram: string;
  kindlyNote: string;
  order: string;
  orderText: string;
  _id: string;
  content: string;
}
const IndexPage: React.FC = () => {
  const [settings, setSettings] = useState<TSetting>();
  const [metaDescription, setMetaDescription] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [lotoImg, setLotoImg] = useState("");
  const [metaImg, setMetaImg] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [copyright, setCopyright] = useState("");
  const [whatsApp, setWhatsApp] = useState<number>();
  const [telegram, setTelegram] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<ILanguage[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axiosPublic.get("/settings");
        const data = response.data.data;
        setSettings(data[0]);
        // Destructure the fetched settings and update the states
        const {
          metaDescription,
          description,
          privacy,
          terms,
          logo,
          favicon,
          lotoImg,
          metaImg,
          title,
          bgColor,
          copyright,
          content,
        } = data[0];

        setContent(content || "");
        setMetaDescription(metaDescription || "");
        setDescription(description || "");
        setPrivacy(privacy || "");
        setTerms(terms || "");
        setLogo(logo || "");
        setFavicon(favicon || "");
        setLotoImg(lotoImg || "");
        setMetaImg(metaImg || "");
        setTitle(title || "Price In Kenya");
        setBgColor(bgColor || "#ab4725");

        setCopyright(
          copyright ||
            "Copyright © 2012-2023 Price in Kenya. All rights reserved."
        );
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();

    const fetchLanguage = async () => {
      const response = await axiosPublic.get("/language");
      setLanguage(response.data.data);
    };
    fetchLanguage();
  }, []);

  const handlePublish = async () => {
    const settingData = {
      metaDescription,
      description,
      privacy,
      terms,
      logo,
      favicon,
      lotoImg,
      metaImg,
      title,
      bgColor,
      copyright,
      content,
    };
    console.log(settingData.content);
    try {
      const response = await axiosPublic.put(
        `/settings/admin/${settings?._id}`,
        settingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Settings updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update settings. Please try again.");
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Photo title="Logo (170x35px)" img={logo} onChange={setLogo} />
          <Photo
            title="Favicon (32x32px)"
            img={favicon}
            onChange={setFavicon}
          />
          <Photo title="Loto (170x35px)" img={lotoImg} onChange={setLotoImg} />
          <Photo
            title="FB Meta (1200x630px)"
            img={metaImg}
            onChange={setMetaImg}
          />
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 w-full gap-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Website Title</p>
            <input
              type="text"
              placeholder="title"
              value={title}
              className="p-2 mt-2 w-full outline-none rounded-md"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="relative w-full flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Website Content</p>

            <select
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select content type</option>
              <option value="off">Off</option>
              {language?.map((lang) => (
                <option key={lang._id} value={lang.language_code}>
                  {lang.language_code}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Website BG color</p>
            <input
              type="color"
              placeholder="title"
              className="h-10 px-1 bg-white mt-2 w-full outline-none rounded-md"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Copyright</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <p className="md:w-60">Meta Description 160</p>
            <Content value={metaDescription} onChange={setMetaDescription} />
          </div>
          <div className="col-span-2">
            <p className="md:w-60">Description</p>
            <Content value={description} onChange={setDescription} />
          </div>

          <div className="col-span-2">
            <p className="md:w-60">Privacy Policies</p>
            <Content value={privacy} onChange={setPrivacy} />
          </div>
          <div className="col-span-2">
            <p className="md:w-60">Terms and Conditions</p>
            <Content value={terms} onChange={setTerms} />
          </div>
        </div>
        <div className="border-y-4 border-main border-dashed py-2 my-8">
          <button
            type="submit"
            className="bg-main text-white px-4 py-2 rounded-md"
            onClick={handlePublish}
          >
            Submit
          </button>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};
export default IndexPage;
