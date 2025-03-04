import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Review } from "../models/SearchCard.interface";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface RatingBarProps {
  rating?: number;
  reviews?: Review[];
  readOnly?: boolean; // Add a prop to control read-only mode
}

const RatingBar: React.FC<RatingBarProps> = ({
  reviews,
  rating,
  readOnly = false,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [value, setValue] = useState<number | null>(rating ?? 0);

  useEffect(() => {
    // Update state if the rating prop changes
    if (rating !== value) {
      setValue(rating ?? 0);
    }
  }, [rating, value]); // Dependency on rating

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating
        name="simple-controlled"
        sx={{ mr: 1 }}
        value={value}
        onChange={(_, newValue) => {
          if (!readOnly) setValue(newValue);
        }} // Prevent updates when readOnly is true
        readOnly={readOnly} // MUI's built-in readOnly prop
      />
      <Typography sx={{ color: theme === "dark" ? "white" : "black" }}>
        ({reviews?.length})
      </Typography>
    </Box>
  );
};

export default RatingBar;
