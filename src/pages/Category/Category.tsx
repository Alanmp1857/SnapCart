import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductService from "../../services/productService";
import CategoryCard from "../../components/CategoryCard";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await ProductService.GetAllCategories();
      const categories = response.data; // Assuming this matches the categories JSON structure
      setCategories(categories);
    } catch (error: any) {
      console.error("Fetch failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: "bold", padding: 2, fontSize: "30px" }}>
        Get All Categories
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: 3,
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        {categories.length > 0 ? (
          categories.map((category: any) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              itemsAvailable={240} // Replace with actual count if available
              imageLink={category.imageUrl}
            />
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </Box>
    </>
  );
};

export default Category;
