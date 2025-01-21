import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import RatingBar from "./RatingBar";

const SearchResult = ({ name }: { name: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "grey",
        width: "40%",
        padding: "10px",
      }}>
      <img
        src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
        alt="Scalable"
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <Typography>{name}</Typography>
      <RatingBar />
      <Typography>$500</Typography>
    </Box>
  );
};

export default SearchResult;
