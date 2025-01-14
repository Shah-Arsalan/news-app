import axios from "axios";
import { CATEGORY_API } from "./constants";
import Constants from "expo-constants";
const KEY = Constants.expoConfig.extra.APIKEY;

export const filterCategories = (sources) => {
  const categories = sources.map((ele) => ele.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
};

export const addCategoryNews = async (category) => {
  console.log("the category is", CATEGORY_API, KEY);
  console.log("the cat api is", CATEGORY_API + category);
  const response = await axios.get(CATEGORY_API + category, {
    params: {
      apiKey: KEY,
    },
  });
  console.log("the response of categoty function is🙂", response.data.sources);
  const data = response?.data?.sources;
  return data;
};
