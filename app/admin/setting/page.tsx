"use client";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
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
}
const IndexPage: React.FC = () => {
  const [settings, setSettings] = useState<TSetting>();
  const [metaDescription, setMetaDescription] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const [orderPolicy, setOrderPolicy] = useState("");
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [lotoImg, setLotoImg] = useState("");
  const [metaImg, setMetaImg] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [country, setCountry] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [copyright, setCopyright] = useState("");
  const [priceZero, setPriceZero] = useState("");
  const [highlights, setHighlights] = useState("");
  const [shipInside, setShipInside] = useState("");
  const [shipOutside, setShipOutside] = useState("");
  const [deliveryMethod1, setDeliveryMethod1] = useState("");
  const [deliveryMethod2, setDeliveryMethod2] = useState("");
  const [pickupMethod1, setPickupMethod1] = useState("");
  const [pickupMethod2, setPickupMethod2] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentText1, setPaymentText1] = useState("");
  const [paymentText2, setPaymentText2] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [whatsApp, setWhatsApp] = useState<number>();
  const [telegram, setTelegram] = useState("");
  const [kindlyNote, setKindlyNote] = useState("");
  const [order, setOrder] = useState("");
  const [orderText, setOrderText] = useState("");

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
          orderPolicy,
          logo,
          favicon,
          lotoImg,
          metaImg,
          title,
          bgColor,
          country,
          currencySymbol,
          copyright,
          priceZero,
          highlights,
          shipInside,
          shipOutside,
          deliveryMethod1,
          deliveryMethod2,
          pickupMethod1,
          pickupMethod2,
          paymentMethod,
          paymentText1,
          paymentText2,
          officeAddress,
          whatsApp,
          telegram,
          kindlyNote,
          order,
          orderText,
        } = data[0];

        setMetaDescription(metaDescription || "");
        setDescription(description || "");
        setPrivacy(privacy || "");
        setTerms(terms || "");
        setOrderPolicy(orderPolicy || "");
        setLogo(logo || "");
        setFavicon(favicon || "");
        setLotoImg(lotoImg || "");
        setMetaImg(metaImg || "");
        setTitle(title || "Price In Kenya");
        setBgColor(bgColor || "#ab4725");
        setCountry(country || "Kenya");
        setCurrencySymbol(currencySymbol || "$");
        setCopyright(
          copyright ||
            "Copyright © 2012-2023 Price in Kenya. All rights reserved."
        );
        setPriceZero(priceZero || "Currently Unavailable");
        setHighlights(highlights || "Highlights");
        setShipInside(shipInside || "Inside Dhaka");
        setShipOutside(shipOutside || "Outside Dhaka");
        setDeliveryMethod1(
          deliveryMethod1 || "Delivery to your home or office"
        );
        setDeliveryMethod2(
          deliveryMethod2 || "Delivered between Same day delivery"
        );
        setPickupMethod1(pickupMethod1 || "Pickup Station");
        setPickupMethod2(
          pickupMethod2 || "Ready to pickup between Same day delivery"
        );
        setPaymentMethod(paymentMethod || "M-PESA Paybill");
        setPaymentText1(paymentText1 || "Business no. 542542");
        setPaymentText2(paymentText2 || "Account no. 794794");
        setOfficeAddress(
          officeAddress ||
            "Bihi Towers, Ground Floor, Suite G8, Moi Avenue, Nairobi CBD."
        );
        setWhatsApp(whatsApp || 8801781077094);
        setTelegram(telegram || "hotlancer");
        setKindlyNote(
          kindlyNote ||
            "that though we strive to keep all products up to date, price and availability are subject to change without prior notice."
        );
        setOrder(order || "Order");
        setOrderText(
          orderText ||
            "from Price in Kenya with fast delivery across the country and in-store pickup in Nairobi."
        );
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handlePublish = async () => {
    const settingData = {
      metaDescription,
      description,
      privacy,
      terms,
      orderPolicy,
      logo,
      favicon,
      lotoImg,
      metaImg,
      title,
      bgColor,
      country,
      currencySymbol,
      copyright,
      deliveryMethod1,
      deliveryMethod2,
      pickupMethod1,
      pickupMethod2,
      paymentMethod,
      paymentText1,
      paymentText2,
      officeAddress,
      whatsApp,
      telegram,
      kindlyNote,
      order,
      orderText,
    };
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
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
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
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Country</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Currency symbol</p>
            <input
              type="text"
              placeholder="Currency symbol"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Price Zero</p>
            <input
              type="text"
              placeholder="Currently Unavailable"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={priceZero}
              onChange={(e) => setPriceZero(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Highlights</p>
            <input
              type="text"
              placeholder="Highlights"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Shipping Inside</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={shipInside}
              onChange={(e) => setShipInside(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Shipping Outside</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={shipOutside}
              onChange={(e) => setShipOutside(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Delivery Method</p>
            <div>
              <input
                type="text"
                placeholder="Delivery to your home or office"
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={deliveryMethod1}
                onChange={(e) => setDeliveryMethod1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Delivered between Same day delivery"
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={pickupMethod1}
                onChange={(e) => setPickupMethod1(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Delivery Method</p>

            <div>
              <input
                type="text"
                placeholder="Pickup Station"
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={deliveryMethod2}
                onChange={(e) => setDeliveryMethod2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ready to pickup between Same day delivery"
                className="p-2 mt-2 w-full outline-none rounded-md"
                value={pickupMethod2}
                onChange={(e) => setPickupMethod2(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Payment</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Peyment text</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={paymentText1}
              onChange={(e) => setPaymentText1(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Peyment text</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={paymentText2}
              onChange={(e) => setPaymentText2(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Office address</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">WhatsApp</p>
            <input
              type="number"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={whatsApp}
              onChange={(e) => setWhatsApp(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Telegram</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Kindly note</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={kindlyNote}
              onChange={(e) => setKindlyNote(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Order</p>
            <input
              type="text"
              placeholder="Order"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-60">Order text</p>
            <input
              type="text"
              placeholder="title"
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={orderText}
              onChange={(e) => setOrderText(e.target.value)}
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
          <div className="col-span-2">
            <p className="md:w-60">Order Policies</p>
            <Content value={orderPolicy} onChange={setOrderPolicy} />
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
