import { useEffect, useState } from "react";
import { ItemCardProps } from "../../models/ItemCard.interface";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import ItemCard from "../../components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/productService"; // Assuming this service exists
import { Typography } from "@mui/material";

const CategoryProducts = () => {
  const [products, setProducts] = useState<ItemCardProps[]>([]);
  const { slug } = useParams(); // Get the `slug` from the URL
  const navigate = useNavigate();

  // Fetch products for the given category
  const getCategoryProducts = async (categorySlug: string) => {
    try {
      const response = await ProductService.getProductsByCategory(categorySlug);
      setProducts(response.data.products); // Assuming the response contains products
    } catch (error) {
      console.error("Fetch failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (slug) {
      getCategoryProducts(slug); // Fetch products when the component mounts or slug changes
    }
  }, [slug]);

  const handleCardClick = (id: string | undefined) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", padding: 2, fontSize: "30px" }}>
        List of Products in {slug}
      </Typography>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.length > 0 ? (
          products.map((item) => (
            <Box key={item.id} sx={{ margin: "20px", paddingLeft: "20px" }}>
              <Grid2
                container
                spacing={{ xs: 2, md: 3, lg: 5 }}
                onClick={() => handleCardClick(item.id)}>
                <ItemCard {...item} />
              </Grid2>
            </Box>
          ))
        ) : (
          <div>Loading products...</div>
        )}
      </Grid2>
    </Box>
  );
};

export default CategoryProducts;
