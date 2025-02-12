import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { CartItem as CartItemType } from "../models/CartItem.interface";
import { useSelector } from "react-redux";
import CartService from "../services/CartService";
import { RootState } from "../store/store";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const {user} = useSelector((state: RootState) => state.user);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (!user || !user.email) {
      console.error("User not logged in");
      return;
    }
    const item = {
      // userId: user.id,
      // email: user.email,
      // productid: id,
      // title,
      // price,
      // thumbnail,
      // quantity: 1,
    };
    console.log(item);
    CartService.AddToCart(item);
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      sx={{
        mt: 1,
        backgroundColor: "greenyellow",
        padding: "10px",
        boxSizing: "content-box",
        boxShadow: "0px 0px 5px green inset",
        borderRadius: "5px",
      }}
    >
      <Grid item xs={2}>
        <img
          src={item.thumbnail} // Replace with the product image URL
          alt="Airpods Max"
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Color: Pink
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6">${item.price}</Typography>
        <Grid container alignItems="center" spacing={1} mt={1}>
          <Button variant="outlined" size="small" onClick={handleDecrease}>
            -
          </Button>
          <Typography mx={2}>{item.quantity}</Typography>
          <Button variant="outlined" size="small" onClick={handleIncrease}>
            +
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
