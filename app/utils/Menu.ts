"use client";
import { useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";
import { useLang } from "../context/langContext";

export interface MenuItem {
  title: string;
  link: string;
  option?: string;
  subItems?: MenuItem[];
  post?: PostItem[];
  postTabs?: TabItem[];
  limit?: string;
}

interface PostItem {
  _id: string;
  title: string;
  img: string;
  link: string;
  category?: any;
  subCategory?: string;
}

interface TabItem {
  title: string;
  link: string;
  post: PostItem[];
}

interface CategoryItem {
  _id: string;
  title: string;
}

interface SubCategoryItem {
  _id: string;
  title: string;
  category: string;
}

export const useMenusData = () => {
  const { lang } = useLang();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosPublic.get(`/categories/type/${lang}`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axiosPublic.get(`/sub-categories/${lang}`);
        setSubCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axiosPublic.get(`/news?lang=${lang}`);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
    fetchNews();
  }, [lang]);

  useEffect(() => {
    const categoryMap = new Map<string, MenuItem>();

    categories.forEach((category) => {
      const subItems = subCategories
        .filter((sub) => sub.category === category._id)
        .map((sub) => ({
          title: sub.title,
          link: `/${lang}/categories/${category._id}/${sub._id}`,
        }));

      const postItems = posts
        .filter((post) => post.category?.category._id === category._id)
        .map((post) => ({
          _id: post._id,
          title: post.title,
          img: post.img,
          link: `/${lang}/news/${post._id}`,
        }));

      const postTabs = subCategories
        .filter((sub) => sub.category === category._id)
        .map((sub) => ({
          title: sub.title,
          link: `/${lang}/categories/${sub._id}`,
          post: posts
            .filter((post) => post.subCategory === sub._id)
            .map((post) => ({
              _id: post._id,
              title: post.title,
              img: post.img,
              link: `/${lang}/news/${post._id}`,
            })),
        }))
        .filter((tab) => tab.post.length > 0);

      let menuItem: MenuItem = {
        title: category.title,
        link: `/${lang}/categories/${category._id}`,
      };

      if (subItems.length > 0) {
        menuItem = {
          ...menuItem,
          option: "sub",
          subItems,
        };
      }

      if (postItems.length > 0) {
        menuItem = {
          ...menuItem,
          option: menuItem.option || "post",
          post: postItems,
          limit: postItems.length > 5 ? "5" : "3",
        };
      }

      if (postTabs.length > 0) {
        menuItem = {
          ...menuItem,
          option: menuItem.option || "tab",
          postTabs,
          limit: postTabs.some((tab) => tab.post.length > 5) ? "5" : "3",
        };
      }

      categoryMap.set(category._id, menuItem);
    });

    setMenus(Array.from(categoryMap.values()));
  }, [categories, subCategories, posts, lang]);

  return menus;
};
