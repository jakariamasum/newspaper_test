"use client";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const [metaDescription, setMetaDescription] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [terms, setTerms] = useState("");
  const [orderPolicy, setOrderPolicy] = useState("");
  const [logo, setLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [lotoImg, setLotoImg] = useState("");
  const [metaImg, setMetaImg] = useState("");
  const [title, setTitle] = useState("Price In Kenya");
  const [bgColor, setBgColor] = useState("#ab4725");
  const [country, setCountry] = useState("Kenya");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [copyright, setCopyright] = useState(
    "Copyright © 2012-2023 Price in Kenya. All rights reserved."
  );
  const [priceZero, setPriceZero] = useState("Currently Unavailable");
  const [highlights, setHighlights] = useState("Highlights");
  const [shipInside, setShipInside] = useState("Inside Dhaka");
  const [shipOutside, setShipOutside] = useState("Outside Dhaka");
  const [deliveryMethod1, setDeliveryMethod1] = useState(
    "Delivery to your home or office"
  );
  const [deliveryMethod2, setDeliveryMethod2] = useState(
    "Delivered between Same day delivery"
  );
  const [pickupMethod1, setPickupMethod1] = useState("Pickup Station");
  const [pickupMethod2, setPickupMethod2] = useState(
    "Ready to pickup between Same day delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState("M-PESA Paybill");
  const [paymentText1, setPaymentText1] = useState("Business no. 542542");
  const [paymentText2, setPaymentText2] = useState("Account no. 794794");
  const [officeAddress, setOfficeAddress] = useState(
    "Bihi Towers, Ground Floor, Suite G8, Moi Avenue, Nairobi CBD."
  );
  const [whatsApp, setWhatsApp] = useState(8801781077094);
  const [telegram, setTelegram] = useState("hotlancer");
  const [kindlyNote, setKindlyNote] = useState(
    "that though we strive to keep all products up to date, price and availability are subject to change without prior notice."
  );
  const [order, setOrder] = useState("Order");
  const [orderText, setOrderText] = useState(
    "from Price in Kenya with fast delivery across the country and in-store pickup in Nairobi."
  );

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
    console.log(settingData);
    try {
      const response = await axiosPublic.post("/settings", settingData);
      console.log(response);
      if (response.status === 200) {
        toast.success("Settings created successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create area. Please try again.");
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
