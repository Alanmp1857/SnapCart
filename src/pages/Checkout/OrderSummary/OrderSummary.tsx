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

const OrderSummary = ({ cartList }: { cartList: any[] }) => {
  const [couponCode, setCouponCode] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  console.log(cartList);

  const handleApplyCoupon = () => {
    // Handle coupon code application logic here
  };

  const handlePayment = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSubTotal(
      cartList.reduce((total, item) => total + item.price * item.quantity, 0)
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={()=>navigate("/")}>Continue Shopping</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderSummary;
