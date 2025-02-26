import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import RatingBar from "./RatingBar";
import { SearchCardProps } from "../models/SearchCard.interface";

const SearchResultCard: React.FC<SearchCardProps> = ({
  images,
  title,
  price,
  reviews,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FAF9F6",
        width: "40%",
        padding: "10px",
        color: "black",
      }}>
      <img
        src={images[0]}
        alt="Scalable"
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <Typography>{title}</Typography>
      <RatingBar reviews={reviews} />
      <Typography sx={{ marginLeft: 1 }}>${price}</Typography>
      <Divider sx={{ color: "black" }} />
    </Box>
  );
};

export default SearchResultCard;
