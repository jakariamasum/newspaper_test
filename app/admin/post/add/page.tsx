import AttachFiles from "@/components/admin/AttachFiles";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Location from "@/components/admin/Location";
import Photo from "@/components/admin/Photo";
import Tag from "@/components/admin/Tag";
import Time from "@/components/admin/Time";

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
                        <div className="mb-4">
                            <p>
                                Description
                            </p>
                            <Content />
                        </div>
                        <div className="mb-4">
                            <p>
                                Keywords
                            </p>
                            <Tag keyword="hello 1, hello 2" />
                        </div>
                        
                                
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
                            <button type="submit" className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md">
                                Publish
                            </button>
                        </div>
                        
                        <Photo
                            title="Photo (600x600px)"
                            img=""
                        />
                        <Time />
                        <Checkbox
                            title="Category"
                            items={[
                                { title: "Category 1", subItems: [{ title: "SubCategory 1.1" }, { title: "SubCategory 1.2" }] },
                                { title: "Category 2", subItems: [{ title: "SubCategory 2.1", checked: true }] },
                                { title: "Category 3", checked: true },
                                { title: "Category 4" }
                            ]}
                        />

                        <div className="mb-4">
                            <p>
                                Reporter
                            </p>
                            <select
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue=""
                            >
                                <option value="HeRa">HeRa</option>
                                <option value="Khan">Khan</option>
                                <option value="Reporter">Reporter</option>
                            </select>
                        </div>

                        <Location
                            items={[
                            {
                                name: "City Name 1",
                                areas: [
                                { name: "Area 1" },
                                { name: "Area 2", selected: true },
                                { name: "Area 3" },
                                ],
                            },
                            {
                                name: "City Name 2",
                                areas: [
                                { name: "Area 4" },
                                { name: "Area 5" },
                                { name: "Area 6" },
                                ],
                            },
                            // Add more cities as needed
                            ]}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};
export default IndexPage;