import Auth from "@/components/Auth";
import Image from "next/image";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <>
      <div className="max-w-screen-md mx-auto py-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={150}
              height={45}
              alt="logo"
              className="outline-0"
            />
          </Link>
          <div className="flex items-center space-x-2">
            <p>Need Help?</p>
            <Link href="/" className="text-blue-500 hover:text-min">
              Live Chat
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-screen-md mx-auto">
        <div className="flex md:flex-row flex-col bg-white">
          <div className="w-full md:w-2/4">
            <Image src="/auth.jpg" width={400} height={400} alt="logo" />
          </div>
          <div className="w-full md:w-2/4 flex justify-center items-center p-10">
            <Auth />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
