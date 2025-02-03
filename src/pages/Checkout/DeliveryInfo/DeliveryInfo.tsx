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
import { setUser } from "../../../store/reducers/userSlice";

const DeliveryInfo = () => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user?.user || {});

  const [values, setValues] = useState({
    username: "",
    address: "",
    city: "",
    zipCode: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (user?.username && user?.address) {
      console.log("User : ", user);

      const { id, password, ...userCopy } = user;
      console.log("userCopy : ", userCopy);

      setValues(userCopy);
    }
  }, [user]);

  const handleSaveAddress = async () => {
    console.log(values);
    await UserService.putUser(user.id, values).then((res) => {
      if (res.status === 200 || res.status === 201) {
        console.log("User updated successfully:", res.data);
        dispatch(setUser(res.data));
        setEditing(false);
      } else {
        console.error("Unexpected response:", res);
      }
    });
  };

  return (
    <Card variant="outlined" sx={{mt:5 ,mb: 2 , backgroundColor:"snow", boxShadow:"0px 0px 5px gray"}}>
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
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
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
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }
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
                  onChange={(e) =>
                    setValues({ ...values, mobile: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  required
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
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
          </>
        ) : (
          <>
            <Button sx={{ float: "right" }} onClick={() => setEditing(true)}>
              edit
            </Button>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              {user.username}
            </Typography>
            <Typography variant="body1">
              {user.address}, {user.city}, {user.zipCode}
            </Typography>
            <Typography variant="body1">+91 {user.mobile}</Typography>
            <Typography variant="body1"> {user.email}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
