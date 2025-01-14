import Constants from 'expo-constants'
const KEY = Constants.expoConfig.extra.APIKEY;

export const BASE_URL = `https://newsapi.org/v2/top-headlines/sources?`;
export const SOURCE_API = `${BASE_URL}apiKey=${KEY}`;
export const CATEGORY_API = `${BASE_URL}category=`;
