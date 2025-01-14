export const filterCategories = (sources) => {
  const categories = sources.map((ele) => ele.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
};
