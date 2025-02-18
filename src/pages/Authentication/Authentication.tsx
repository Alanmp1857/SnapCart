import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import UserService from "../../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

export type Props = {
  open: boolean;
  onClose: () => void;
  auth: string;
  setAuth: () => void;
};

const Authentication: React.FC<Props> = ({ open, onClose, auth, setAuth }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    terms: false,
  });

  // const auth = useSelector((state: RootState) => state.auth.auth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value, // Use `checked` for checkboxes, `value` otherwise
    });
  };

  const handleSignUp = () => {
    UserService.addUsers({
      username: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
      wallet: 0,
    })
      .then((res) => {
        // Assuming a successful response has a status code of 200
        if (res.status === 200 || res.status === 201) {
          console.log("User added successfully:", res.data);
          setAuth();
        } else {
          console.error("Unexpected response:", res);
        }
      })
      .catch((error) => {
        // Handling errors such as network issues or server errors
        if (error.response) {
          // Server responded with a status code outside the 2xx range
          console.error("Error adding user:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
        } else {
          // Something else happened
          console.error("Error occurred:", error.message);
        }
      });
  };

  const handleLogin = async () => {
    try {
      const response = await UserService.getAllUsers();
      const users = response.data;

      // Find user with matching email and password
      const validUser = users.find(
        (user: any) =>
          user.email === values.email && user.password === values.password
      );

      if (validUser) {
        console.log("Authentication successful:", validUser);
        dispatch(setUser(validUser));
        onClose();
      } else {
        console.error("Authentication failed: Invalid email or password");
      }
    } catch (error: any) {
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          height: "80%",
          backgroundColor: "rgb(37, 0, 39, 0.9)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 24,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: 1,
            background:
              "url('https://wallpapers.com/images/featured/scenic-pictures-t2yvnwf5t8xhy7eg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            borderRadius: 2,
            margin: 1,
            p: 3,
          }}
        >
          <Typography variant="h4" color="white" fontWeight="bold">
            Capturing Moments,
          </Typography>
          <Typography variant="h5" color="white">
            Creating Memories
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "white",
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "white",
                opacity: 0.4,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "white",
                opacity: 0.4,
              }}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {auth === "signup" ? "Create an account" : "Log in"}
          </Typography>
          <Typography variant="body2">
            {auth === "signup"
              ? "Already have an account? "
              : "Not having an Account "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={setAuth}
            >
              {auth === "signup" ? "Log in" : "Sign up"}
            </Typography>
          </Typography>

          {auth === "signup" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                name="firstName"
                fullWidth
                label="First name"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  input: { color: "white" },
                  ".MuiInputLabel-root": { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                  },
                }}
              />
              <TextField
                name="lastName"
                fullWidth
                label="Last name"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  input: { color: "white" },
                  ".MuiInputLabel-root": { color: "white" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                  },
                }}
              />
            </Box>
          )}

          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            sx={{
              input: { color: "white" },
              ".MuiInputLabel-root": { color: "white" },
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
              },
            }}
          />
          <TextField
            fullWidth
            name="password"
            label="Enter your password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                auth === "signup" ? handleSignUp() : handleLogin();
              }
            }}
            sx={{
              input: { color: "white" },
              ".MuiInputLabel-root": { color: "white" },
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
              },
            }}
          />
          {auth === "signup" && (
            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                />
              }
              label={
                <Typography variant="body2" color="white">
                  I agree to the{" "}
                  <Typography
                    component="span"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Terms & Conditions
                  </Typography>
                </Typography>
              }
            />
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={auth === "signup" ? handleSignUp : handleLogin}
            sx={{
              backgroundColor: "rgb(138, 74, 255)",
              "&:hover": { backgroundColor: "rgb(118, 58, 214)" },
            }}
            disabled={auth === "signup" ? !values.terms : false}
          >
            {auth === "signup" ? "Create account" : "Log in"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Authentication;
