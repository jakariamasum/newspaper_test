import Table from "@/components/admin/Table";
import { useAllCities } from "@/lib/useAllCities";

const IndexPage: React.FC = async () => {
  const cities = await useAllCities();
  return (
    <>
      <Table title="City" link="/admin/city" post={cities} />
    </>
  );
};
export default IndexPage;
