import axios from "axios"

const GetAllProducts=()=>{
    return axios.get("http://localhost:4000/products")
}

const GetAllCategories=()=>{
    return axios.get("http://localhost:4000/categories")
}

const GetProductsByCategory=(text:string)=>{
    return axios.get(`https://dummyjson.com/products/category/${text}`)
}

const ProductService={
    GetAllCategories,
    GetAllProducts,
    GetProductsByCategory
}

export default ProductService