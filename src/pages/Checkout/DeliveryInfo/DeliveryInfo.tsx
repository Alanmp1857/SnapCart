import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import UserService from "../../../services/userService";
import { setUser, updateAddress } from "../../../store/reducers/userSlice";

const DeliveryInfo = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  // Local state to hold form data
  const [city, setCity] = useState(user.address[0]?.city || "");
  const [state, setState] = useState(user.address[0]?.state || "");
  const [zipCode, setZipCode] = useState(user.address[0]?.zipCode || "");
  const [mobile, setMobile] = useState(user.address[0]?.mobile || "");
  const [username, setUsername] = useState(user.username || "");

  // Update the address in the Redux store
  const handleUpdateAddress = () => {
    const updatedAddress = { city, state, zipCode, mobile };
    dispatch(updateAddress(updatedAddress)); // Update the user's address
  };

  // Update the user object in the Redux store (like username or email)
  const handleUpdateUser = () => {
    const updatedUser = { username }; // Example of updating the user data
    dispatch(setUser(updatedUser)); // Update the user object (username in this case)
  };

  // Save the user data back to the server
  const handleSaveAddress = async () => {
    const updatedUser = {
      ...user,
      address: [{ city, state, zipCode, mobile }],
    };
    await UserService.putUser(user.id, updatedUser).then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("User updated successfully:", res.data);
        dispatch(setUser(res.data));
        setEditing(false);
      } else {
        console.error("Unexpected response:", res);
      }
    });
  };

  // Effect to set initial values when user data changes
  useEffect(() => {
    if (user?.username && user?.address) {
      setCity(user.address[0]?.city || "");
      setState(user.address[0]?.state || "");
      setZipCode(user.address[0]?.zipCode || "");
      setMobile(user.address[0]?.mobile || "");
      setUsername(user.username || "");
    }
  }, [user]);

  return (
    <Card
      variant="outlined"
      sx={{
        mt: 5,
        mb: 2,
        backgroundColor: "snow",
        boxShadow: "0px 0px 5px gray",
      }}>
      <CardContent>
        <Typography variant="h6">Delivery Information</Typography>
        <Divider sx={{ my: 2 }} />
        {!user.address || editing ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City / Town"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAddress}
              fullWidth
              sx={{ mt: 2 }}>
              Save Address
            </Button>
          </>
        ) : (
          <>
            <Button sx={{ float: "right" }} onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {user.username}
            </Typography>
            <Typography variant="body1">
              {user.address[0]?.city}, {user.address[0]?.state},{" "}
              {user.address[0]?.zipCode}
            </Typography>
            <Typography variant="body1">
              +91 {user.address[0]?.mobile}
            </Typography>
            <Typography variant="body1"> {user.email}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
