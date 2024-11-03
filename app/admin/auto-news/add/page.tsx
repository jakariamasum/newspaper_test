import { getAllLanguages } from "@/app/services/admin/LanguageServices";
import { getCategoryByLang } from "@/app/services/categoryServices";
import { getSubCategoryByLang } from "@/app/services/subCategoryServices";
import AutoNewsForm from "@/components/AutoNews";
import { ICategory } from "@/types/category.types";
import { ILanguage } from "@/types/language.types";
import { ISubCategory } from "@/types/subcategory.types";

export default async function AutoNews() {
  const languages: ILanguage[] = await getAllLanguages();
  const defaultLang = languages[0]?.language_code || "en";
  const categories: ICategory[] = await getCategoryByLang(defaultLang);
  const subcategories: ISubCategory[] = await getSubCategoryByLang(defaultLang);

  return (
    <div className="container mx-auto px-4 py-8">
      <AutoNewsForm
        languages={languages}
        initialCategories={categories}
        initialSubcategories={subcategories}
      />
    </div>
  );
}
