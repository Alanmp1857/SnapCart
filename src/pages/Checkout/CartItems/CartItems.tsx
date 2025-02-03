import { Card, CardContent, Typography, Divider } from "@mui/material";
import CartItem from "../../../components/CartItem";
import CartService from "../../../services/CartService";
import { useEffect, useState } from "react";

const CartItems = () => {
  const [cartList, setCartList] = useState<any[]>([]);

  const getAllCartItems = async () => {
    try {
      const cartItems = await CartService.GetAllCartItems();
      console.log(cartItems)
      setCartList(cartItems);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setCartList([]); // Ensure state remains an empty array on failure
    }
  };
  

  useEffect(() => {
    getAllCartItems();
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: "white",
        boxShadow: "0px 0px 5px gray",
        padding: "10px",
      }}
    >
      <CardContent>
        <Typography variant="h6">Review Item And Shipping</Typography>
        <Divider sx={{ my: 2 }} />
        {cartList.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CartItems;
