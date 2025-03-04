import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import RatingBar from "./RatingBar";
import { SearchCardProps } from "../models/SearchCard.interface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const SearchResultCard: React.FC<SearchCardProps> = ({
  images,
  title,
  price,
  reviews,
  rating,
}) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme === "dark" ? "#343A40" : "#e5e5e5",
        color: theme === "dark" ? "white" : "black",
        width: "30vw",
        padding: "10px",
      }}>
      <img
        src={images[0]}
        alt="Scalable"
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <Typography>{title}</Typography>
      <RatingBar reviews={reviews} rating={rating} readOnly />
      <Typography sx={{ marginLeft: 1 }}>${price}</Typography>
      <Divider sx={{ color: "black" }} />
    </Box>
  );
};

export default SearchResultCard;
