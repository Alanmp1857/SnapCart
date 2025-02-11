import { Box, Card, CardContent, Typography, Button, TextField, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

const Wallet = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = () => {
    // Logic to apply the coupon can be added here
    alert(`Coupon ${coupon} applied!`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%" sx={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}>
      <Card sx={{ minWidth: 500, padding: 3, textAlign: "center", boxShadow: 5, borderRadius: 3, background: "#fff3e0" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom color="secondary" fontWeight="bold">
            Wallet Balance
          </Typography>
          <Typography variant="h3" color="primary" gutterBottom fontWeight="bold">
            ₹{user.wallet?.toFixed(2) || "0.00"}
          </Typography>
          <Stack spacing={2} direction="column" alignItems="center" mt={2}>
            <TextField 
              label="Enter Coupon Code" 
              variant="outlined" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="secondary" onClick={handleApplyCoupon}>
              Apply Coupon
            </Button>
            <Button variant="contained" color="primary">
              Add Funds
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Wallet;