import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { Review } from "../models/SearchCard.interface";

interface RatingBarProps {
  reviews?: Review[];
}

const RatingBar: React.FC<RatingBarProps> = ({ reviews }) => {
  const [value, setValue] = useState<number | null>(2);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating
        name="simple-controlled"
        sx={{ mr: 1 }}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography>({reviews?.length})</Typography>
    </Box>
  );
};

export default RatingBar;
