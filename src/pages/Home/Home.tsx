import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Grid2 } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import { useEffect, useState } from "react";
import { ItemCardProps } from "../../models/ItemCard.interface";
import ProductService from "../../services/productService";
import Banner from "../../assets/banner.jpg";
import { useNavigate } from "react-router";

const Home = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  const navigate = useNavigate();

  const [products, setProducts] = useState<ItemCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProductResults = async () => {
    try {
      const response = await ProductService.getAllProducts();
      const data = response.data.slice(0, 10);

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed: ", error.response?.data || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductResults();
  }, []);

  const handleCardClick = (id: string | undefined) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        height: "100%",
        width: "100%",
        paddingBottom: "20px",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: backgroundColor,
        }}>
        <img
          src={Banner}
          alt="Banner"
          style={{ width: "90%", height: "400px" }}
        />
      </Box>
      <Box>
        <h2
          style={{
            marginLeft: "20px",
            paddingLeft: "20px",
            paddingTop: "20px",
          }}>
          Popular Products for You!
        </h2>
      </Box>
      <Box sx={{ margin: "20px", paddingLeft: "20px" }}>
        {loading && <p>Loading...</p>}
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {products.map((product, index) => (
            <Grid2
              key={index}
              size={{ xs: 2, sm: 4, md: 3 }}
              onClick={() => handleCardClick(product.id)}>
              <ItemCard key={product.id} {...product} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Home;
