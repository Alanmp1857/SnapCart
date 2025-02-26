import { Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductService from "../../services/productService";
import CategoryCard from "../../components/CategoryCard";
import { useNavigate } from "react-router";
import { CategoryProps } from "../../models/Category.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Category = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const response = await ProductService.getAllCategories();
      const categories = response.data;
      setCategories(categories);
    } catch (error) {
      console.error("Fetch failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCardClick = (slug: string) => {
    // Navigate to the category's product page with the slug
    navigate(`/category/${slug}`);
  };

  return (
    <Box sx={{ backgroundColor: backgroundColor }}>
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
        }}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Grid2
              key={category.id}
              onClick={() => handleCardClick(category.slug)}>
              <CategoryCard
                name={category.name}
                itemsAvailable={240} // Assuming this is dynamic or can be fetched
                imageLink={category.imageUrl}
              />
            </Grid2>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </Box>
    </Box>
  );
};

export default Category;
