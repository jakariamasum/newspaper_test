import { getAllLanguages } from "@/app/services/admin/LanguageServices";
import { getAllAutoNews } from "@/app/services/autoNewsServices";
import { getCategoryByLang } from "@/app/services/categoryServices";
import { getSubCategoryByLang } from "@/app/services/subCategoryServices";
import AutoNewsTable from "@/components/AutoNewsTable";
import { ICategory } from "@/types/category.types";
import { ILanguage } from "@/types/language.types";
import { ISubCategory } from "@/types/subcategory.types";
import Link from "next/link";

export default async function AutoNewsPage() {
  const autoNews = await getAllAutoNews();
  const languages: ILanguage[] = await getAllLanguages();
  const defaultLang = languages[0]?.language_code || "en";
  const categories: ICategory[] = await getCategoryByLang(defaultLang);
  const subcategories: ISubCategory[] = await getSubCategoryByLang(defaultLang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end items-center mb-2">
        <Link
          href="/admin/auto-news/add"
          className="bg-main text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add
        </Link>
      </div>
      <AutoNewsTable
        initialAutoNews={autoNews}
        languages={languages}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}
