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
import { RootState } from "../../store/store";
import UserService from "../../services/userService";
import { setUser } from "../../store/reducers/userSlice";

const DeliveryInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user?.user || {});

  const [values, setValues] = useState({
    userName: "",
    address: "",
    city: "",
    zipCode: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (user?.username) {
      setValues((prev) => ({
        ...prev,
        userName: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleSaveAddress = async() => {
    console.log(values);
    await UserService.putUser(user.id, values).then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("User updated successfully:", res.data);
        dispatch(setUser(res.data));
      } else {
        console.error("Unexpected response:", res);
      }
    })
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Delivery Information</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              required
              value={values.userName}
              onChange={(e) =>
                setValues({ ...values, userName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              required
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City / Town"
              required
              value={values.city}
              onChange={(e) => setValues({ ...values, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Zip Code"
              required
              value={values.zipCode}
              onChange={(e) =>
                setValues({ ...values, zipCode: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mobile"
              required
              value={values.mobile}
              onChange={(e) => setValues({ ...values, mobile: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAddress}
          fullWidth
          sx={{ mt: 2 }}
        >
          Save Address
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
