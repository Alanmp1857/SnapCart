import { Card, CardContent, Typography, Divider } from "@mui/material";
import CartItem from "../../../components/CartItem";

const CartItems = ({ cartList }: { cartList: any[]}) => {
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
