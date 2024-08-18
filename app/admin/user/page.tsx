import Table from "@/components/admin/Table";
import { useAllUsers } from "@/lib/useAllUsers";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const IndexPage: React.FC = async () => {
  const users = await useAllUsers();
  const handleEdit = (id: string) => {
    // ToDO: edit logic
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: delete logic
    alert(`Delete user with ID: ${id}`);
  };
  return (
    <div className="overflow-x-auto mx-16 mt-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={user.img}
                  alt={user.title}
                  className="w-12 h-12 object-cover rounded-full"
                  width={400}
                  height={400}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role}
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap  text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                  onClick={() => handleEdit(user._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default IndexPage;
