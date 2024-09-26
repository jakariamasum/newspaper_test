export const categoryFormat = (
  subCategories: { _id: string; title: string; category: string }[],
  categories: { _id: string; title: string }[],
  selectedCategory?: {
    category: { _id: string; title: string };
    subCategory?: { _id: string; title: string };
  } // Accept both category and subCategory with _id and title
) => {
  console.log(subCategories, categories, selectedCategory);
  return categories.map((category) => ({
    title: category.title,
    _id: category._id,
    checked: selectedCategory
      ? category._id === selectedCategory.category._id
      : undefined, // Check if category ID matches
    subCategories: subCategories
      .filter((subCategory) => subCategory.category === category._id)
      .map((subCategory) => ({
        title: subCategory.title,
        _id: subCategory._id,
        checked: selectedCategory?.subCategory
          ? subCategory._id === selectedCategory.subCategory._id
          : undefined, // Check if subCategory ID matches
      })),
  }));
};
