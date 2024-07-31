import Table from "@/components/admin/Table";
import { useAllNews } from "@/lib/useAllNews";

const IndexPage: React.FC = async () => {
  const news = await useAllNews();
  return (
    <>
      <Table title="News" link="/admin/post" post={news} />
    </>
  );
};
export default IndexPage;
