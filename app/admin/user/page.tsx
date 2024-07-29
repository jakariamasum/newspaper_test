import Table from "@/components/admin/Table";
import { useAllUsers } from "@/lib/useAllUsers";

const IndexPage: React.FC = async () => {
  const users = await useAllUsers();
  return (
    <>
      <Table title="Users" link="/admin/user" post={users} />
    </>
  );
};
export default IndexPage;
