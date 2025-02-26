import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import "./OrderSummary.css"; // Import external CSS
import { useNavigate } from "react-router";
import orderService from "../../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CartService from "../../../services/CartService";
import { OrderProps } from "../../../models/UserProps.interface";
import { addOrders } from "../../../store/reducers/userSlice";

const OrderSummary = ({ cartList, refreshData }: any) => {
  const [couponCode, setCouponCode] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user?.user);
  console.log("User", user);

  const handleApplyCoupon = () => {
    // Handle coupon code application logic here
  };

  const handleDeleteCartItems = async () => {
    try {
      await cartList.map((item: any) => CartService.DeleteCartItem(item.id));
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    setOpen(true);
  };

  const paymentDone = async () => {
    const orders: any = Array.isArray(user.orders) ? [...user.orders] : [];
    const orderList = [];
    for (let i = 0; i < cartList.length; i++) {
      const order: OrderProps = {
        productId: String(cartList[i].id),
        quantity: parseInt(cartList[i].quantity, 10),
      };
      orderList.push(order);
    }
    dispatch(addOrders(orderList));

    orders.push(orderList);

    try {
      await orderService.addOrders(user.id, { orders }); // Ensure this matches the API's expected format
      await handleDeleteCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    paymentDone();
  };

  useEffect(() => {
    setSubTotal(
      cartList.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      )
    );
  }, [cartList]);

  return (
    <Card
      variant="outlined"
      className="order-summary"
      sx={{
        backgroundColor: "lightgray",
        boxShadow: "0px 0px 10px gray inset",
      }}
    >
      <CardContent>
        <Typography variant="h6" className="title">
          Order Summary
        </Typography>
        <Divider className="divider" />

        {/* Coupon Input */}
        <TextField
          fullWidth
          label="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="coupon-input"
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                size="small"
                onClick={handleApplyCoupon}
              >
                Apply
              </Button>
            ),
          }}
        />

        {/* Payment Details */}
        <Typography variant="subtitle1" className="section-title">
          Payment Details
        </Typography>
        <RadioGroup defaultValue="creditCard" className="radio-group">
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
          <FormControlLabel
            value="creditCard"
            control={<Radio />}
            label="Credit or Debit Card"
          />
          <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
        </RadioGroup>

        {/* Payment Inputs */}
        <Grid container spacing={2} className="payment-inputs">
          <Grid item xs={12}>
            <TextField fullWidth label="Email" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Card Holder Name" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Card Number" required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Expiry (MM/YY)" required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="CVC" required />
          </Grid>
        </Grid>

        {/* Price Details */}
        <Box className="price-details">
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Sub Total <span>${subTotal.toFixed(2)}</span>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Tax (10%) <span>${(subTotal * 0.1).toFixed(2)}</span>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Coupon Discount <span>${(40.0).toFixed(2)}</span>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
            Shipping Cost <span>${(60.0).toFixed(2)}</span>
          </Typography>
          <Divider className="divider" />
          <Typography variant="h6" className="total" sx={{ my: "10px" }}>
            Total
            <span>
              = ${(subTotal + subTotal * 0.1 - 40.0 + 60.0).toFixed(2)}
            </span>
          </Typography>
        </Box>

        {/* Pay Button */}
        <Button
          variant="contained"
          fullWidth
          className="pay-button"
          sx={{
            bgcolor: "green",
            borderRadius: "30px",
            padding: "10px",
            my: "10px",
          }}
          onClick={handlePayment}
        >
          Pay ${(subTotal + subTotal * 0.1 - 40.0 + 60.0).toFixed(2)}
        </Button>

        {/* Shopcart Cashback Banner */}
        <Box className="cashback-banner">
          <Typography variant="body2">Earn 5% cash back on Shopcart</Typography>
          <Button variant="text" size="small">
            Learn More
          </Button>
        </Box>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => {
              navigate("/");
              paymentDone();
            }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderSummary;
