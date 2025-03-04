import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";
import bannerDark from "../../assets/banner-dark.jpg";
import bannerLight from "../../assets/banner-light.jpg";
import ProductList from "../ProductList/ProductList";

const Home = () => {
  const { backgroundColor, theme } = useSelector(
    (state: RootState) => state.theme
  );

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
          src={theme === "dark" ? bannerLight : bannerDark}
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
            color: theme === "dark" ? "white" : "black",
          }}>
          Popular Products for You!
        </h2>
      </Box>
      <Box sx={{ margin: "20px", paddingLeft: "20px" }}>
        <ProductList />
      </Box>
    </Box>
  );
};

export default Home;
