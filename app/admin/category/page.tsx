import Table from "@/components/admin/Table";
import { useAllCategory } from "@/lib/useAllCategory";
import Link from "next/link";

const IndexPage: React.FC = async () => {
  const categories = await useAllCategory();
  console.log(categories);
  return (
    <>
      <Table title="Category" link="/admin/category" post={categories} />
    </>
  );
};
export default IndexPage;
