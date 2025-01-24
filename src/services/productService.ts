import axios from "axios";

const getAllProducts = () => {
  return axios.get("http://localhost:4000/products");
};

const getAllCategories = () => {
  return axios.get("http://localhost:4000/categories");
};

const getProductsByCategory = (text: string) => {
  return axios.get(`https://dummyjson.com/products/category/${text}`);
};

const ProductService = {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
};

export default ProductService;
