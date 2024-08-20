import { useSettings } from "@/app/context/settingContext";

const AdminFooter: React.FC = () => {
  const { settings } = useSettings();
  console.log(settings);
  return (
    <>
      <div className="bg-main text-white py-2">
        <div className="container">{settings?.title || ""}</div>
      </div>
    </>
  );
};

export default AdminFooter;
