import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";

const CartItems = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Review Item And Shipping</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <img
              src="/path-to-image" // Replace with the product image URL
              alt="Airpods Max"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Airpods - Max</Typography>
            <Typography variant="body2" color="textSecondary">
              Color: Pink
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">$549.00</Typography>
            <Grid container alignItems="center" spacing={1} mt={1}>
              <Button variant="outlined" size="small" onClick={handleDecrease}>
                -
              </Button>
              <Typography mx={2}>{quantity}</Typography>
              <Button variant="outlined" size="small" onClick={handleIncrease}>
                +
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItems;
