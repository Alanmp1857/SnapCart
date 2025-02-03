import { useState } from "react";
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
} from "@mui/material";
import "./OrderSummary.css"; // Import external CSS

const OrderSummary = () => {
  const [couponCode, setCouponCode] = useState("");

  // Price Details
  const subTotal = 549.0;
  const tax = subTotal * 0.1;
  const discount = -tax;
  const shippingCost = 0.0;
  const total = subTotal + tax + discount + shippingCost;

  return (
    <Card variant="outlined" className="order-summary" sx={{backgroundColor:"lightgray", boxShadow:"0px 0px 10px gray inset"}}>
      <CardContent>
        <Typography variant="h6" className="title">Order Summary</Typography>
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
              <Button variant="contained" size="small">
                Apply
              </Button>
            ),
          }}
        />

        {/* Payment Details */}
        <Typography variant="subtitle1" className="section-title">Payment Details</Typography>
        <RadioGroup defaultValue="creditCard" className="radio-group">
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
          <FormControlLabel value="shopcard" control={<Radio />} label="Shopcart Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit or Debit Card" />
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
          <Typography variant="body2">Sub Total <span>${subTotal.toFixed(2)}</span></Typography>
          <Typography variant="body2">Tax (10%) <span>${tax.toFixed(2)}</span></Typography>
          <Typography variant="body2">Coupon Discount <span>${discount.toFixed(2)}</span></Typography>
          <Typography variant="body2">Shipping Cost <span>${shippingCost.toFixed(2)}</span></Typography>
          <Divider className="divider" />
          <Typography variant="h6" className="total">Total <span>= ${total.toFixed(2)}</span></Typography>
        </Box>

        {/* Pay Button */}
        <Button variant="contained" fullWidth className="pay-button">
          Pay ${total.toFixed(2)}
        </Button>

        {/* Shopcart Cashback Banner */}
        <Box className="cashback-banner">
          <Typography variant="body2">Earn 5% cash back on Shopcart</Typography>
          <Button variant="text" size="small">Learn More</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
