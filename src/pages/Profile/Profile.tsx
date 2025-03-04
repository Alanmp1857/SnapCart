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
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Profile = () => {
  const userId = useSelector((state: RootState) => state.user.user.id);
  const { backgroundColor, theme } = useSelector(
    (state: RootState) => state.theme
  );
  const fontColor = theme === "dark" ? "white" : "black";
  const bgColor = theme === "dark" ? "#343A40" : "#e5e5e5";

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
    <Box sx={{ backgroundColor: backgroundColor, height: "100vh" }}>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ color: fontColor }}>
          Profile Settings
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="h6" sx={{ color: fontColor }}>
            Change Password
          </Typography>
          <TextField
            id="outlined-basic"
            label="Change Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                color: fontColor, // Text color
                "& fieldset": {
                  borderColor: fontColor, // Border color
                },
                "&:hover fieldset": {
                  borderColor: fontColor, // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: fontColor, // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: fontColor, // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor, // Label color when focused
              },
            }}
          />

          <Button
            variant="contained"
            onClick={changePassword}
            sx={{ mt: 3, ml: 1 }}>
            Update
          </Button>
        </Box>

        <Divider
          sx={{
            my: 2,
            color: fontColor,
            backgroundColor: bgColor,
          }}
        />

        <Box>
          <Typography variant="h6" sx={{ color: fontColor }}>
            Change Username
          </Typography>
          <TextField
            id="outlined-basic"
            label="Change Username"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                color: fontColor, // Text color
                "& fieldset": {
                  borderColor: fontColor, // Border color
                },
                "&:hover fieldset": {
                  borderColor: fontColor, // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: fontColor, // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: fontColor, // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor, // Label color when focused
              },
            }}
          />

          <Button
            variant="contained"
            onClick={changePassword}
            sx={{ mt: 3, ml: 1 }}>
            Update
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
