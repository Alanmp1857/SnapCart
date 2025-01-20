import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";

const Home = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        height: "100vh",
        width: "100%",
      }}>
      Home
    </Box>
  );
};

export default Home;
