import Link from "next/link";
import { ILanguage } from "@/types/language.types";
import axiosPublic from "@/lib/axiosPublic";
import Languages from "@/components/admin/Language";

const IndexPage = async () => {
  const languages = await axiosPublic.get("/language");

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold mb-4">Available Languages</h2>
        <Link
          href={`type/add`}
          className="bg-main py-1 px-4 rounded-md text-white"
        >
          Add
        </Link>
      </div>
      <Languages languages={languages.data.data} />
    </div>
  );
};

export default IndexPage;
