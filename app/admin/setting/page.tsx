import Settings from "@/components/admin/Settings";
import axiosPublic from "@/lib/axiosPublic";

const IndexPage = async () => {
  const settings = await axiosPublic(`/settings`);
  const languages = await axiosPublic(`/language`);
  return (
    <div className="container my-4">
      <Settings
        initialSettings={settings.data.data[0]}
        languages={languages.data.data}
      />
    </div>
  );
};

export default IndexPage;
