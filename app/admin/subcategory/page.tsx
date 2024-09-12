"use client";
import { useLang } from "@/app/context/langContext";
import Table from "@/components/admin/Table";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";

const IndexPage: React.FC = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await axiosPublic.get(`/sub-categories/${lang}`);
      setSubCategories(response.data.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  if (loading) {
    return <div className="text-center">Loading......</div>;
  }
  return (
    <>
      <Table
        title="SubCategory"
        link="/admin/subcategory"
        post={subCategories}
      />
    </>
  );
};
export default IndexPage;
