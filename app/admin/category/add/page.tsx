import CatOp from "@/components/admin/CatOp";
import Content from "@/components/admin/Content";
import Photo from "@/components/admin/Photo";

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
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
                            <button type="submit" className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md">
                                Publish
                            </button>
                        </div>
                        <div>
                            <p>
                                Position
                            </p>
                            <input
                                type="number"
                                placeholder="1"
                                className="p-2 mt-2 w-full outline-none rounded-md"
                                defaultValue={1}
                            />
                        </div>
                        
                        <CatOp />

                        <Photo
                            title="Photo"
                            img=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default IndexPage;