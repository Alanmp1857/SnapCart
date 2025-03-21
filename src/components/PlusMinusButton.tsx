import React, { useState, useEffect } from "react";
import { CounterProps } from "../models/Button.interface";
import Box from "@mui/material/Box";
import { Button, styled, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RoundedButtonLeft = styled(Button)({
  padding: "10px 20px",
  fontSize: "16px",
  borderTopLeftRadius: "50%",
  borderBottomLeftRadius: "50%",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  textTransform: "none", // Keeps the text as-is, without uppercase transformation
  "&:hover": { backgroundColor: "none", boxShadow: "none" },
});

const RoundedButtonRight = styled(Button)({
  padding: "10px 20px",
  fontSize: "16px",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  borderTopRightRadius: "50%",
  borderBottomRightRadius: "50%",
  textTransform: "none", // Keeps the text as-is, without uppercase transformation
  "&:hover": { backgroundColor: "none", boxShadow: "none" },
});

const PlusMinusButton: React.FC<CounterProps> = ({
  initialValue = 1,
  min = 1,
  max = 10,
  onChange,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const fontColor = theme === "dark" ? "white" : "black";
  const bgColor = theme === "dark" ? "#343A40" : "#e5e5e5";

  const [count, setCount] = useState<number>(initialValue);

  // Reset count when initialValue prop changes
  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  const handleIncrement = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: theme === "dark" ? "white" : "black",
      }}>
      <RoundedButtonLeft
        onClick={handleDecrement}
        sx={{
          color: fontColor,
          backgroundColor: bgColor,
        }}
        disableRipple>
        <RemoveIcon />
      </RoundedButtonLeft>
      <Typography
        sx={{
          backgroundColor: bgColor,
          color: fontColor,
          padding: 1.25,
          border: "none",
        }}>
        {count}
      </Typography>
      <RoundedButtonRight
        onClick={handleIncrement}
        sx={{ color: fontColor, backgroundColor: bgColor }}
        disableRipple>
        <AddIcon />
      </RoundedButtonRight>
    </Box>
  );
};

export default PlusMinusButton;
