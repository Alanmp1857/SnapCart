import { Typography } from "@mui/material";
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
        backgroundColor: "grey",
        width: "40%",
        padding: "10px",
      }}>
      <img
        src={images[0]}
        // src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
        alt="Scalable"
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <Typography>{title}</Typography>
      <RatingBar reviews={reviews} />
      <Typography sx={{ marginLeft: 1 }}>${price}</Typography>
    </Box>
  );
};

export default SearchResultCard;
