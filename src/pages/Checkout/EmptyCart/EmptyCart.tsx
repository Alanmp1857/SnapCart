import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../store/store";
import cart from "../../../assets/shopping-cart.jpg";

export interface EmptyCartProps {
  isLoggedin: boolean;
}

const EmptyCart = ({ isLoggedin }: EmptyCartProps) => {
  const navigate = useNavigate();
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  return (
    <Box
      sx={{
        position: "absolute", // Ensures it covers the entire screen
        top: 40,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
      }}>
      <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        Your Cart is Empty
      </Typography>
      <img src={cart} alt="" width="40%" style={{ margin: "20px 0px" }} />
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

export default EmptyCart;
