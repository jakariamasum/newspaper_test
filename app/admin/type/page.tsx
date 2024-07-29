import Table from "@/components/admin/Table";
import { useAllLanguages } from "@/lib/useAllLanguage";

const IndexPage: React.FC = async () => {
  const languages = await useAllLanguages();
  console.log(languages);
  return (
    <>
      <Table title="models type" link="/admin/type" post={languages} />
    </>
  );
};
export default IndexPage;
