import { ReactNode, useContext, useEffect } from "react";
import { useAuth } from "../context/authContext";
import axiosPublic from "@/lib/axiosPublic";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, setUser, loading, setLoading, logout } = useAuth();

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
        console.log("private route", response.data.data);
        if (response.data.data) {
          setUser(response.data.data._doc);
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
    toast.warning("You dont access here!!");
    logout();
    (window.location.href = "/auth"), { replace: true };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === "admin") {
    return (window.location.href = "/admin");
  }
  if (user?.role === "reporter") {
    return (window.location.href = "/");
  }

  return children;
};

export default PrivateRoute;
