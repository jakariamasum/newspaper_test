"use client";
import { useState } from 'react'; // Import useState hook for managing menu state
import Image from 'next/image';
import Link from 'next/link';

const AdminHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu open/close

  return (
    <div className='bg-main sticky top-0 z-50'>
      <div className='container'>
        <div className="flex justify-between items-center py-1">
          <Link href="/admin" className='outline-none'>
            <Image
              src="/logo.png"
              width={300}
              height={70}
              alt="Logo"
            />
          </Link>
          {/* Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu open/close
              className="text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32z"/></svg>
            </button>
          </div>
          {/* Menu Items */}
          <div className={`md:flex md:text-white md:space-x-6 ${menuOpen ? 'absolute w-40 space-y-2 p-4 right-0 flex flex-col bg-white text-black top-10' : 'hidden'}`}>
          <Link href="/" target='_blank'>
              HoMe
            </Link>
            <Link href="/admin/post">
              News
            </Link>
            <Link href="/admin/category">
              Category
            </Link>
            <Link href="/admin/setting">
              Setting
            </Link>
            <Link href="/admin/logout">
            Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;