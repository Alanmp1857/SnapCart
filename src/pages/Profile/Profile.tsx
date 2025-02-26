import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UserService from "../../services/userService";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Profile = () => {
  const userId = useSelector((state: RootState) => state.user.user.id);

  const [password, setPassword] = useState<string>("");

  const changePassword = async () => {
    if (!userId || !password) {
      console.warn("User ID or Password missing.");
      return;
    }

    try {
      const response = await UserService.updateUserPassword(userId, password);
      console.log(response.data);
      console.log("Password updated successfully:", response.data);
      setPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <Box>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h4">Profile Settings</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Change Password</Typography>
        <TextField
          id="outlined-basic"
          label="Change Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          onClick={changePassword}
          sx={{ mt: 3, ml: 1 }}>
          Update
        </Button>
      </Container>
    </Box>
  );
};

export default Profile;
