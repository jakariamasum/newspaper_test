"use client";
import Banners from "@/components/admin/Banners";
import Checkbox from "@/components/admin/Checkbox";

const IndexPage: React.FC = () => {
    return (
        <>
            <div className="container my-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="mb-4">
                            <p>
                                Title
                            </p>
                            <input
                                type="text"
                                placeholder="title"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                            />
                        </div>                       
                        <Banners
                            items={[
                                { img: "/stories/1.jpg", title: "title 1"},
                                { img: "/stories/2.jpg", title: "title 2"},
                                { img: "/stories/3.jpg", title: "title 3"},
                            ]}
                        />
                        
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
                            <button type="submit" className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md">
                                Publish
                            </button>
                        </div>
                        <Checkbox
                            title="Category"
                            items={[
                                { title: "Category 1", subItems: [{ title: "SubCategory 1.1" }, { title: "SubCategory 1.2" }] },
                                { title: "Category 2", subItems: [{ title: "SubCategory 2.1", checked: true }] },
                                { title: "Category 3", checked: true },
                                { title: "Category 4" }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default IndexPage;