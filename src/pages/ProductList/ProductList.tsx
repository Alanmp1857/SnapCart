import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductService from "../../services/productService";
import ItemCard from "../../components/ItemCard";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router";
import { ItemCardProps } from "../../models/ItemCard.interface";

const ProductList = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  const navigate = useNavigate();

  const [results, setResults] = useState<ItemCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllProducts();
      const data = response.data;

      const randomData = data.sort(() => Math.random() - 0.5).slice(0, 10);

      setResults(randomData);
    } catch (error) {
      setError("Failed to fetch products, please try again later.");
      console.error("Fetch failed: ", error.response?.data || error.message);
    } finally {
      setLoading(false); // Turn off loading after the fetch completes
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (id: string | undefined) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ backgroundColor: backgroundColor }}>
      <Box>
        {/* <h2
          style={{
            marginLeft: "20px",
            paddingLeft: "20px",
            paddingTop: "20px",
            color: "inherit",
          }}>
          Popular Products for You!
        </h2> */}
      </Box>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} {/* Display error message if fetch fails */}
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {results.map((items) => (
          <Box sx={{ margin: "20px", paddingLeft: "20px" }}>
            <Grid2
              container
              spacing={{ xs: 2, md: 3, lg: 5 }}
              onClick={() => handleCardClick(items.id)}
            >
              <ItemCard {...items} />
            </Grid2>
          </Box>
        ))}
      </Grid2>
    </Box>
  );
};

export default ProductList;
