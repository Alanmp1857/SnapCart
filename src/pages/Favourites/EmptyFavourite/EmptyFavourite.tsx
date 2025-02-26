import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import favourite from "../../../assets/favourite.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface EmptyCartProps {
  isLoggedin: boolean;
}

const EmptyFavourite = ({ isLoggedin }: EmptyCartProps) => {
  const navigate = useNavigate();

  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
      }}>
      <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        Please Login to view your Favourites
      </Typography>
      <img src={favourite} alt="" style={{ margin: "20px 0px" }} />
      {isLoggedin ? (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
              mr: "15px",
            }}>
            Start adding Products
          </Typography>
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 20px",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "5px",
            }}
            onClick={() => navigate("/")}>
            Go to Homepage
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "inline-flex" }}>
          <Button
            sx={{
              backgroundColor: "yellow",
              color: "black",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "25px",
            }}>
            Sign in to your Account
          </Button>
          <Button
            sx={{
              ml: "15px",
              backgroundColor: "white",
              color: "black",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "25px",
            }}>
            SignUp
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmptyFavourite;
