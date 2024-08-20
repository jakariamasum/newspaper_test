export const categoryFormat = (
  subCategories: { _id: string; title: string; category: string }[],
  categories: { _id: string; title: string }[]
) => {
  console.log(subCategories, categories);
  return categories.map((category) => ({
    title: category.title,
    _id: category._id,
    subCategories: subCategories
      .filter((subCategory) => subCategory.category === category._id)
      .map((subCategory) => ({
        title: subCategory.title,
        _id: subCategory._id,
      })),
  }));
};
