import React, { useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import Login from "../Login/Login";
// import Register from "../Register/Register";

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  auth: string;
  setAuth: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onClose, auth, setAuth }) => {
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
    console.log(values);
  };

  const handleSignUp = () => {
    console.log(values);
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
            onClick={handleSignUp}
            sx={{
              backgroundColor: "rgb(138, 74, 255)",
              "&:hover": { backgroundColor: "rgb(118, 58, 214)" },
            }}
          >
            {auth === "signup" ? "Create account" : "Log in"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Popup;
