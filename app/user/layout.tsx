"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dates from "@/components/Date";
import PrivateRoute from "../router/privateRouter";
import { toast, Toaster } from "sonner";
import { useAuth } from "../context/authContext";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
    toast.warning("You are logged out!");
  };

  // Function to check if the route is active
  const isActive = (paths: string[]) => paths.includes(pathname);

  return (
    <main className="mx-20">
      <div>
        <div className="bg-main container sticky top-0 z-50">
          <div className="flex items-center justify-between text-white">
            <Link href="/" className="outline-none font-extrabold text-2xl">
              User
            </Link>
            <div className="flex items-center space-x-2">
              <div className="hidden md:block"></div>
              {user?.role && (
                <>
                  <Link
                    className={`hover:bg-main hover:text-white p-2 block ${
                      isActive(["/user/post", "/user/post/add"])
                        ? "bg-main text-white"
                        : ""
                    }`}
                    href="/user/post"
                  >
                    Post
                  </Link>
                  <Link
                    className={`hover:bg-main hover:text-white p-2 block ${
                      isActive(["/user/type", "/user/type/add"])
                        ? "bg-main text-white"
                        : ""
                    }`}
                    href="/user/type"
                  >
                    Models type
                  </Link>
                  <Link
                    className="hover:bg-main hover:text-white p-2 block"
                    href="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                  <Dates lan="en-US" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <PrivateRoute>{children}</PrivateRoute>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
