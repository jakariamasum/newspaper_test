import Table from "@/components/admin/Table";
import { useAllArea } from "@/lib/useAllArea";

const IndexPage: React.FC = async () => {
  const areas = await useAllArea();
  return (
    <>
      <Table title="Area" link="/admin/area" post={areas} />
    </>
  );
};
export default IndexPage;
