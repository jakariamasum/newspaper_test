import Link from "next/link";

const Footer: React.FC = () => {
  
    return (
      <>
        <div className="bg-main text-white py-2 mt-2">
          <div className="container">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
              Copyright © 2024 Newspaper. All rights reserved.
              </div>
              <div className="flex space-x-2 md:justify-end md:items-center">
                <Link
                  href="/privacy-policies"
                >
                  Privacy Policies
                </Link>
                <Link
                  href="/terms-and-conditions"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/order-policies"
                >
                  Order Policies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Footer;