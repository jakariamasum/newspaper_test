"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/authContext";
import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, setUser, loading, setLoading, logout } = useAuth();
  const router = useRouter();

  console.log(pathname, searchParams);
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        handleAccessDenied();
        return;
      }

      try {
        setLoading(true);
        const response = await axiosPublic.post(
          `/user/verify-user`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        console.log("private route", response);
        if (response.data.data) {
          setUser(response.data.data);
        } else {
          handleAccessDenied();
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        handleAccessDenied();
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const handleAccessDenied = () => {
    toast.warning("You don't have access here!!");
    logout();
    router.push("/auth");
  };

  useEffect(() => {
    if (!loading) {
      if (user?.role === "admin") {
        router.replace(`${pathname}`);
      } else if (user?.role === "reporter") {
        router.push("/");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
