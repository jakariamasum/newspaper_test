"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import Photo from "@/components/admin/Photo";
import Content from "@/components/admin/Content";
import { ILanguage } from "@/types/language.types";
import { TSetting } from "@/types/settings.types";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/app/services/admin/SettingServices";

interface SettingsProps {
  initialSettings: TSetting;
  languages: ILanguage[];
}

const Styles = Array.from({ length: 5 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Style ${i + 1}`,
}));

const Settings: React.FC<SettingsProps> = ({ initialSettings, languages }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [metaDescription, setMetaDescription] = useState(
    initialSettings.metaDescription || ""
  );
  const [description, setDescription] = useState(
    initialSettings.description || ""
  );
  const [privacy, setPrivacy] = useState(initialSettings.privacy || "");
  const [terms, setTerms] = useState(initialSettings.terms || "");
  const [logo, setLogo] = useState(initialSettings.logo || "");
  const [favicon, setFavicon] = useState(initialSettings.favicon || "");
  const [lotoImg, setLotoImg] = useState(initialSettings.lotoImg || "");
  const [metaImg, setMetaImg] = useState(initialSettings.metaImg || "");
  const [title, setTitle] = useState(initialSettings.title || "Price In Kenya");
  const [bgColor, setBgColor] = useState(initialSettings.bgColor || "#ab4725");
  const [copyright, setCopyright] = useState(initialSettings.copyright || "");
  const [content, setContent] = useState(initialSettings.content || "");
  const [header, setHeader] = useState(initialSettings.header || "1");
  const [footer, setFooter] = useState(initialSettings.footer || "1");
  const [facebook, setFacebook] = useState(initialSettings.facebook || "");
  const [whatsapp, setWhatsapp] = useState(initialSettings.whatsapp || "");
  const [twitter, setTwitter] = useState(initialSettings.twitter || "");
  const [pinterest, setPinterest] = useState(initialSettings.pinterest || "");
  const [headerBox, setHeaderBox] = useState(initialSettings.headerBox || "");
  const [bodyBox, setBodyBox] = useState(initialSettings.bodyBox || "");
  const [categoryStyle, setCategoryStyle] = useState(
    initialSettings.categoryStyle || "1"
  );
  const [detailsStyle, setDetailsStyle] = useState(
    initialSettings.detailsStyle || "1"
  );

  const handlePublish = async () => {
    setLoading(true);
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
      categoryStyle,
      detailsStyle,
      header,
      footer,
      facebook,
      whatsapp,
      twitter,
      pinterest,
      headerBox,
      bodyBox,
    };

    const success = await updateSettings(initialSettings._id, settingData);
    console.log(success);
    if (success) {
      router.refresh();
      setLoading(false);
    }
    setLoading(false);
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
              placeholder="Title"
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
              {languages.map((lang) => (
                <option key={lang._id} value={lang.language_code}>
                  {lang.language_code}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Category Grade</p>
            <select
              onChange={(e) => setCategoryStyle(e.target.value)}
              value={categoryStyle}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select Category Style</option>
              {Styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Details Grade</p>
            <select
              onChange={(e) => setDetailsStyle(e.target.value)}
              value={detailsStyle}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select Details Style</option>
              {Styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Header Style</p>
            <select
              onChange={(e) => setHeader(e.target.value)}
              value={header}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select Header Style</option>
              {Styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Footer Style</p>
            <select
              onChange={(e) => setFooter(e.target.value)}
              value={footer}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">Select Footer Style</option>
              {Styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Website BG color</p>
            <input
              type="color"
              className="h-10 px-1 bg-white mt-2 w-full outline-none rounded-md"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Copyright</p>
            <input
              type="text"
              placeholder="Copyright"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Facebook</p>
            <input
              type="text"
              placeholder="Title"
              value={facebook}
              className="p-2 mt-2 w-full outline-none rounded-md"
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Whatsapp</p>
            <input
              type="text"
              placeholder="Title"
              value={whatsapp}
              className="p-2 mt-2 w-full outline-none rounded-md"
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Pinterest</p>
            <input
              type="text"
              placeholder="https://"
              value={pinterest}
              className="p-2 mt-2 w-full outline-none rounded-md"
              onChange={(e) => setPinterest(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Twitter</p>
            <input
              type="text"
              placeholder="https://"
              value={twitter}
              className="p-2 mt-2 w-full outline-none rounded-md"
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <p className="md:w-60">Header Box</p>
            <div className="flex flex-col gap-1 w-full">
              <textarea
                id="html-box-header"
                value={headerBox}
                onChange={(e) => setHeaderBox(e.target.value)}
                className="w-full h-auto p-2 border rounded mb-2"
                placeholder="Enter HTML for header box"
              />
              <div
                className="w-full bg-white p-2 border rounded"
                dangerouslySetInnerHTML={{ __html: headerBox }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full">
            <p className="md:w-60">Body Box</p>
            <div className="flex flex-col gap-1 w-full">
              <textarea
                id="html-box-body"
                value={bodyBox}
                onChange={(e) => setBodyBox(e.target.value)}
                className="w-full h-auto p-2 border rounded mb-2"
                placeholder="Enter HTML for body box"
              />
              <div
                className="w-full bg-white p-2 border rounded"
                dangerouslySetInnerHTML={{ __html: bodyBox }}
              />
            </div>
          </div>

          <div className="col-span-2">
            <p className="md:w-60">Meta Description</p>
            <textarea
              name="metaDescription"
              id="metaDescription"
              placeholder="Meta Description here"
              maxLength={160}
              onChange={(e) => setMetaDescription(e.target.value)}
              value={metaDescription}
              className="border rounded p-2 w-full"
            ></textarea>
            <p className="text-sm text-gray-500">
              {160 - metaDescription.length} characters remaining
            </p>
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default Settings;
