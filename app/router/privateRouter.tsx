"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, setUser, loading, setLoading, logout } = useAuth();
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

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

        if (response.data.data) {
          setUser(response.data.data);
        } else {
          handleAccessDenied();
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        handleAccessDenied();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const handleAccessDenied = () => {
    toast.warning("You don't have access here!!");
    logout();
    localStorage.removeItem("authToken");
    router.push("/");
  };

  useEffect(() => {
    if (!loading && user) {
      const isAdminRoute = pathname.startsWith("/admin");
      const isReporterRoute = pathname.startsWith("/user");

      if (user.role === "admin" && isAdminRoute) {
        setAccessGranted(true);
      } else if (user.role === "reporter" && isReporterRoute) {
        setAccessGranted(true);
      } else {
        handleAccessDenied();
      }
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Prevent loading the restricted page
  if (!accessGranted) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
