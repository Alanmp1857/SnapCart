import { Card, CardContent, Typography, Divider, Button } from "@mui/material";
import CartItem from "../../../components/CartItem";
import CartService from "../../../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart } from "../../../store/reducers/userSlice";
import { RootState } from "../../../store/store";

const CartItems = ({
  cartList,
  refreshData,
}: {
  cartList: any[];
  refreshData: () => void;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleDeleteCartItems = async () => {
    try {
      // await cartList.map((item: any) => CartService.DeleteCartItem(item.id));
      await dispatch(removeAllCart());
      await CartService.clearCart(user.id);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

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
          <CartItem key={item.id} item={item} refreshData={refreshData} />
        ))}
      </CardContent>
      <Button
        sx={{
          mt: 2,
          backgroundColor: "red",
          color: "white",
          padding: "5px 20px",
          borderRadius: "5px",
        }}
        onClick={() => {
          handleDeleteCartItems();
        }}
      >
        Remove all Items
      </Button>
    </Card>
  );
};

export default CartItems;
