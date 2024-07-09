import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";

const IndexPage: React.FC = () => {
    return (
        <>
            <div className="container my-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <Photo
                        title="Logo (170x35px)"
                        img=""
                    />
                    <Photo
                        title="Favicon (32x32px)"
                        img=""
                    />
                    <Photo
                        title="Loto (170x35px)"
                        img=""
                    />
                    <Photo
                        title="FB Meta (1200x630px)"
                        img=""
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Website Title
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Price In Kenya"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Website BG color
                        </p>
                        <input
                            type="color"
                            placeholder="title"
                            className="h-10 px-1 bg-white mt-2 w-full outline-none rounded-md"
                            defaultValue="#ab4725"
                        />
                    </div>
                    
                    
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Copyright
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Copyright © 2012-2023 Price in Kenya. All rights reserved."
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Country
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Kenya"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Currency symbol
                        </p>
                        <input
                            type="text"
                            placeholder="Currency symbol"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="$"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Price Zero
                        </p>
                        <input
                            type="text"
                            placeholder="Currently Unavailable"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Currently Unavailable"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                        Highlights
                        </p>
                        <input
                            type="text"
                            placeholder="Highlights"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Highlights"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Shipping Inside
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Inside Dhaka"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Shipping Outside
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Outside Dhaka"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Delivery Method
                        </p>
                        <div>
                            <input
                                type="text"
                                placeholder="Delivery to your home or office"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue="Delivery to your home or office"
                            />
                            <input
                                type="text"
                                placeholder="Delivered between Same day delivery"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue="Delivered between Same day delivery"
                            />
                        </div>
                        
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Delivery Method
                        </p>

                        <div>
                            <input
                                type="text"
                                placeholder="Pickup Station"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue="Pickup Station"
                            />
                            <input
                                type="text"
                                placeholder="Ready to pickup between Same day delivery"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue="Ready to pickup between Same day delivery"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Peyment
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="M-PESA Paybill"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Peyment text
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Business no. 542542"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                        Peyment text
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Account no. 794794"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Office address
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Bihi Towers, Ground Floor, Suite G8, Moi Avenue, Nairobi CBD."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            WhatsApp
                        </p>
                        <input
                            type="number"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue={8801781077094}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Telegram
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="hotlancer"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Kindly note
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="that though we strive to keep all products up to date, price and availability are subject to change without prior notice."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Order
                        </p>
                        <input
                            type="text"
                            placeholder="Order"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="Order"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                        <p className="md:w-60">
                            Order text
                        </p>
                        <input
                            type="text"
                            placeholder="title"
                            className="p-2 mt-2 w-full outline-none rounded-md"
                            defaultValue="from Price in Kenya with fast delivery across the country and in-store pickup in Nairobi."
                        />
                    </div>
                    <div className="col-span-2">
                        <p className="md:w-60">
                            Meta Description 160
                        </p>
                        <Content />
                    </div>
                    <div className="col-span-2">
                        <p className="md:w-60">
                            Description
                        </p>
                        <Content />
                    </div>

                    <div className="col-span-2">
                        <p className="md:w-60">
                        Privacy Policies
                        </p>
                        <Content />
                    </div>
                    <div className="col-span-2">
                        <p className="md:w-60">
                        Terms and Conditions
                        </p>
                        <Content />
                    </div>
                    <div className="col-span-2">
                        <p className="md:w-60">
                        Order Policies
                        </p>
                        <Content />
                    </div>
                </div>
                <div className="border-y-4 border-main border-dashed py-2 my-8">
                    <button type="submit" className="bg-main text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                </div>
                
            </div>
        </>
    );
};
export default IndexPage;