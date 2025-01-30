import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { Review } from "../models/SearchCard.interface";

interface RatingBarProps {
  rating?: number;
  reviews?: Review[];
}

const RatingBar: React.FC<RatingBarProps> = ({ reviews, rating }) => {
  const [value, setValue] = useState<number | null>(rating ?? 0);

  useEffect(() => {
    // Update state if the rating prop changes
    if (rating !== value) {
      setValue(rating ?? 0);
    }
  }, [rating]); // Dependency on rating

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating
        name="simple-controlled"
        sx={{ mr: 1 }}
        value={value}
        onChange={(_, newValue) => setValue(newValue)} // updates state when rating changes
      />
      <Typography>({reviews?.length})</Typography>
    </Box>
  );
};

export default RatingBar;
