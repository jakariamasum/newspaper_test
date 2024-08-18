/* eslint-disable react-hooks/rules-of-hooks */
import { useAllCategory } from "@/lib/useAllCategory";
import { useAllNews } from "@/lib/useAllNews";
import { useAllSubCategories } from "@/lib/useAllSubCategory";

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
  category: {
    subCategory: string;
    category: {
      _id: string;
      subCategory: string;
    };
  };
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

export const fetchMenusData = async (): Promise<MenuItem[]> => {
  const categories: CategoryItem[] = await useAllCategory();
  const subCategories: SubCategoryItem[] = await useAllSubCategories();
  const posts: PostItem[] = await useAllNews();

  const categoryMap = new Map<string, MenuItem>();

  for (const category of categories) {
    // Determine subItems for the current category
    const relatedSubCategories = subCategories.filter(
      (sub) => sub.category === category._id
    );
    const subItems: MenuItem[] = relatedSubCategories.map((sub) => ({
      title: sub.title,
      link: `/category/${sub._id}`,
    }));

    // Determine posts for the current category
    const relatedPosts = posts.filter(
      (post) => post.category.category._id === category._id
    );
    const postItems: PostItem[] = relatedPosts.map((post) => ({
      _id: post._id,
      title: post.title,
      img: post.img,
      link: `/news/${post._id}`,
      category: post.category,
    }));

    // Determine tabs and their subItems for the current category
    const tabItems: TabItem[] = relatedSubCategories
      .map((sub) => ({
        title: sub.title,
        link: `/category/${sub._id}`,
        post: posts
          .filter((post) => post.category.subCategory === sub._id)
          .map((post) => ({
            _id: post._id,
            title: post.title,
            img: post.img,
            link: `/news/${post._id}`,
            category: post.category,
          })),
      }))
      .filter((tab) => tab.post.length > 0); // Remove tabs with no posts

    // Prepare menu item based on available options
    if (subItems.length > 0) {
      const menuItem: MenuItem = {
        title: category.title,
        link: `/category/${category._id}`,
        option: "sub",
        subItems,
      };
      categoryMap.set(category._id, menuItem);
    }

    if (postItems.length > 0) {
      const existingItem = categoryMap.get(category._id);
      if (existingItem) {
        existingItem.post = postItems;
        existingItem.limit = postItems.length > 5 ? "5" : undefined;
        existingItem.option = "post";
      } else {
        const menuItem: MenuItem = {
          title: category.title,
          link: `/category/${category._id}`,
          option: "post",
          limit: postItems.length > 5 ? "5" : undefined,
          post: postItems,
        };
        categoryMap.set(category._id, menuItem);
      }
    }

    if (tabItems.length > 0) {
      const existingItem = categoryMap.get(category._id);
      if (existingItem) {
        existingItem.postTabs = tabItems;
        existingItem.limit = tabItems.some((tab) => tab.post.length > 5)
          ? "5"
          : undefined;
        existingItem.option = "tab";
      } else {
        const menuItem: MenuItem = {
          title: category.title,
          link: `/category/${category._id}`,
          option: "tab",
          limit: tabItems.some((tab) => tab.post.length > 5) ? "5" : undefined,
          postTabs: tabItems,
        };
        categoryMap.set(category._id, menuItem);
      }
    }

    // Add the category if it doesn't fit into subItems, post, or postTabs
    if (
      subItems.length === 0 &&
      postItems.length === 0 &&
      tabItems.length === 0
    ) {
      const menuItem: MenuItem = {
        title: category.title,
        link: `/category/${category._id}`,
      };
      categoryMap.set(category._id, menuItem);
    }
  }

  // Convert the categoryMap values to an array
  const menus = Array.from(categoryMap.values());

  return menus;
};
