"use client";
import { useLang } from "@/app/context/langContext";
import Table from "@/components/admin/Table";
import Loader from "@/components/Loader";
import axiosPublic from "@/lib/axiosPublic";
import { useEffect, useState } from "react";

const IndexPage: React.FC = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useLang();
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await axiosPublic.get(
        `/sub-categories/sub-category/types?type=story`
      );
      setSubCategories(response.data.data);
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
        title="SubCategory"
        link="/admin/stories/subcategories"
        post={subCategories}
      />
    </>
  );
};
export default IndexPage;
