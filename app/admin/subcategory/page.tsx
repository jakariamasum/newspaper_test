import Table from "@/components/admin/Table";
import { useAllSubCategories } from "@/lib/useAllSubCategory";

const IndexPage: React.FC = async () => {
  const subCategories = await useAllSubCategories();
  return (
    <>
      <Table
        title="SubCategory"
        link="/admin/subcategory"
        post={subCategories}
      />
    </>
  );
};
export default IndexPage;
