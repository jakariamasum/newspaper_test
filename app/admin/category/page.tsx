"use client";
import { useLang } from "@/app/context/langContext";
import Table from "@/components/admin/Table";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await axiosPublic.get(`/categories/type/${lang}`);
      setCategories(response.data.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  if (loading) {
    return <div className="text-center">Loading......</div>;
  }
  return (
    <>
      <Table title="Category" link="/admin/category" post={categories} />
    </>
  );
};
export default IndexPage;
