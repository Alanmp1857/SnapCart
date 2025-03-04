import { Grid, Typography, Button } from "@mui/material";
import { CartItem as CartItemType } from "../models/CartItem.interface";
import CartService from "../services/CartService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addCart, removeCart } from "../store/reducers/userSlice";

interface CartItemProps {
  item: CartItemType;
  refreshData: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, refreshData }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [values, setValues] = useState(item);
  const dispatch = useDispatch();

  const updateCart = (item: any, quantity: number) => {
    setValues((prev) => ({
      ...prev,
      quantity: quantity,
    }));
    console.log(values);
    refreshData();
    try {
      CartService.updateCartQuantity(user.id, item.productid, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = () => {
    dispatch(
      addCart({ productId: values.productid, quantity:1 })
    );
    updateCart(values, values.quantity + 1);
  };

  const handleDecrease = () => {
    if (values.quantity > 1) {
      dispatch(removeCart(values.productid)); // Fix: Call removeCart instead
      updateCart(values, values.quantity - 1);
    } else {
      console.log("Deleted");
      try {
        CartService.removeFromCart(user.id, values.productid);
        dispatch(removeCart(values.productid));
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
