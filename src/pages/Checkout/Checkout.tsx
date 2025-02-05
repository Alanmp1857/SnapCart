import React, { useEffect, useState } from "react";
import CartItems from "./CartItems/CartItems";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./Checkout.css"; // Import external CSS
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Button, Typography } from "@mui/material";
import CartService from "../../services/CartService";

const Checkout: React.FC = () => {
  const [cartList, setCartList] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  const getAllCartItems = async (userId: string) => {
    try {
      const cartItems = await CartService.GetCartItemsByUser(userId);
      console.log(cartItems);
      setCartList(cartItems);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setCartList([]); // Ensure state remains an empty array on failure
    }
  };

  useEffect(() => {
    user.id && getAllCartItems(user.id);
  }, []);

  return (
    <div className="checkout-container">
      {user.email ? (
        <>
          {/* Left Section - Cart and Delivery Info */}
          <div className="checkout-left">
            <CartItems cartList={cartList} />
            <DeliveryInfo />
          </div>

          {/* Right Section - Order Summary */}
          <div className="checkout-right">
            <OrderSummary cartList={cartList} />
          </div>
        </>
      ) : (
        <>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
            >
              Your Cart is Empty
            </Typography>
            <img
              src="https://imgs.search.brave.com/PQjRtu5e0vNMbWkufqsBX-L3ESfk5tSuTZkTt9T0bMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzczLzE1Lzkx/LzM2MF9GXzczMTU5/MTY2X3ViN0hEVVdl/UDRMM250Wk5NWk9F/QmtSOG5maU1vMTRa/LmpwZw"
              alt=""
              width="50%"
              style={{ margin: "20px 0px" }}
            />
            <Box sx={{ display: "inline-flex" }}>
              <Button
                sx={{
                  backgroundColor: "yellow",
                  color: "black",
                  boxShadow: "0px 0px 3px gray",
                  borderRadius: "25px",
                }}
              >
                Sign in to your Account
              </Button>
              <Button
                sx={{
                  ml: "15px",
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "0px 0px 3px gray",
                  borderRadius: "25px",
                }}
              >
                SignUp
              </Button>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Checkout;
