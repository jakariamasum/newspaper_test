"use client";
import { useLang } from "@/app/context/langContext";
import Table from "@/components/admin/Table";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await axiosPublic.get(
        `/categories/category/types?type=story`
      );
      setCategories(response.data.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Table
        title="Sub Category"
        link="/admin/stories/categories"
        post={categories}
      />
    </>
  );
};
export default IndexPage;
