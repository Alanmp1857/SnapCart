import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import UserService from "../../services/userService";
import { setUser } from "../../store/reducers/userSlice";

const Wallet = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  const [coupon, setCoupon] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFunds = async () => {
    const updatedUser = {
      ...user,
      wallet: user.wallet + amount,
    };
    await UserService.putUser(user.id, updatedUser).then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("User updated successfully:", res.data);
        dispatch(setUser(res.data));
        setOpen(false);
        setAmount(0);
      } else {
        console.error("Unexpected response:", res);
      }
    });
  };

  // const handleApplyCoupon = () => {
  //   // Logic to apply the coupon can be added here
  //   alert(`Coupon ${coupon} applied!`);
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      sx={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
    >
      <Card
        sx={{
          minWidth: 500,
          padding: 3,
          textAlign: "center",
          boxShadow: 5,
          borderRadius: 3,
          background: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            color="secondary"
            fontWeight="bold"
          >
            Wallet Balance
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
            fontWeight="bold"
          >
            ${user.wallet?.toFixed(2) || "0.00"}
          </Typography>
          <Stack spacing={2} direction="column" alignItems="center" mt={2}>
            {/* <TextField 
              label="Enter Coupon Code" 
              variant="outlined" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="secondary" onClick={handleApplyCoupon}>
              Apply Coupon
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Funds
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount of money you want to add to your wallet
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddFunds}>ADD</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Wallet;
