import Table from "@/components/admin/Table";
import { useAllPages } from "@/lib/useAllPage";

const IndexPage: React.FC = async () => {
  const pages = await useAllPages();
  return (
    <>
      <Table title="Pages" link="/admin/page" post={pages} />
    </>
  );
};
export default IndexPage;
