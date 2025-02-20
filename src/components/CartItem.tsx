import { Grid, Typography, Button } from "@mui/material";
import { CartItem as CartItemType } from "../models/CartItem.interface";
import CartService from "../services/CartService";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  refreshData: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, refreshData }) => {
  const [values, setValues] = useState(item);

  const updateCart = (item: any, quantity: number) => {
    setValues((prev) => ({
      ...prev,
      quantity: quantity,
    }));
    console.log(values);
    try {
      CartService.updateCart(item, quantity, item.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = () => updateCart(item, values.quantity + 1);
  const handleDecrease = () => {
    if (values.quantity > 1) {
      updateCart(item, values.quantity - 1);
    } else {
      console.log("Deleted");
      try {
        CartService.DeleteCartItem(values.id);
        refreshData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      sx={{
        mt: 1,
        backgroundColor: "snow",
        padding: "10px",
        boxSizing: "content-box",
        boxShadow: "0px 0px 5px gray inset",
        borderRadius: "5px",
      }}
    >
      <Grid item xs={2}>
        <img
          src={values.thumbnail} // Replace with the product image URL
          alt="Airpods Max"
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{values.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Color: Pink
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6">${values.price}</Typography>
        <Grid container alignItems="center" spacing={1} mt={1}>
          <Button variant="outlined" size="small" onClick={handleDecrease}>
            -
          </Button>
          <Typography mx={2}>{values.quantity}</Typography>
          <Button variant="outlined" size="small" onClick={handleIncrease}>
            +
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
