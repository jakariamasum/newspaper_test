import Link from "next/link";
import Languages from "@/components/admin/Language";
import { getAllLanguages } from "@/app/services/admin/LanguageServices";

const IndexPage = async () => {
  const languages = await getAllLanguages();

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
      <Languages languages={languages} />
    </div>
  );
};

export default IndexPage;
