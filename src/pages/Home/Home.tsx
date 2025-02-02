import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";
import Banner from "../../assets/banner.jpg";
import ProductList from "../ProductList/ProductList";

const Home = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

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
        <ProductList />
      </Box>
    </Box>
  );
};

export default Home;
