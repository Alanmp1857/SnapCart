import axios from "axios";

const getAllProducts = () => {
  return axios.get("http://localhost:4000/products");
};

const getProductById = (id: string) => {
  return axios.get(`http://localhost:4000/products/${id}`);
};

const getAllCategories = () => {
  return axios.get("http://localhost:4000/categories");
};

const getProductsByCategory = (text: string) => {
  return axios.get(`https://dummyjson.com/products/category/${text}`);
};

const getProductsByIds = (ids: string[]) => {
  const response = axios.get(`/products?ids=${ids.join(",")}`);
  return response;
};

const getProductsFromFavourites = (id: string) => {
  return axios.get(`http://localhost:4000/userdata/favourites/${id}`);
};

const ProductService = {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByIds,
  getProductsFromFavourites,
};

export default ProductService;
