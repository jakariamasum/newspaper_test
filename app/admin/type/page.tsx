import Table from "@/components/admin/Table";
import { useAllLanguages } from "@/lib/useAllLanguage";
import Link from "next/link";

interface languageData {
  _id: string;
  lang: string;
  title: string;
  link: string;
}

const IndexPage: React.FC = async () => {
  const languages = await useAllLanguages();
  console.log(languages);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Languages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {languages.map((language: languageData) => (
          <div
            key={language._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-semibold mb-2">{language.title}</h3>

            <Link
              href={`type/${language.link}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              See News
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default IndexPage;
