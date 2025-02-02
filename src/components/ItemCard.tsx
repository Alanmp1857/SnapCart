import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import CustomButton from "./CustomButton";
import { ItemCardProps } from "../models/ItemCard.interface";

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  price,
  thumbnail,
  rating,
  brand,
  reviews,
  category,
}) => {
  const [value, setValue] = useState<number | null>(rating || 0);
  return (
    <Card
      sx={{
        maxWidth: 280,
        maxHeight: 400,
        height: "100%",
        width: "300px",
        position: "relative",
        boxShadow: "none",
        border: "1px solid #e0e2e4",
        display: "flex", // Horizontal layout
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: "lightgray",
          border: "1px solid black",
        },
      }}>
      {/* Ensure relative positioning for absolute children */}
      <CardActionArea disableRipple>
        {/* Favorite Icon Positioned Over Image */}
        <IconButton
          aria-label="add to favorites"
          disableRipple
          sx={{
            position: "absolute",
            top: 10, // Adjust position
            right: 10, // Adjust position
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Background for visibility
            borderRadius: "50%",
            "&:hover": { backgroundColor: "transparent" },
          }}>
          <FavoriteIcon />
        </IconButton>

        {/* Image */}
        <CardMedia
          component="img"
          height="150"
          image={thumbnail}
          alt={title}
          sx={{
            objectFit: "contain",
            backgroundColor: "transparent",
          }}
        />

        {/* Product Details */}
        <CardContent sx={{ backgroundColor: "transparent" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              {title.length > 20
                ? title.slice(0, 20) + "..."
                : title.slice(0, 20)}{" "}
              | {brand}
            </Typography>
            {/* <Typography gutterBottom variant="h6">
              ${price}
            </Typography> */}
          </div>
          <Typography variant="h6">${price}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {category}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: 2,
            }}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            />
            <p>({reviews?.length})</p>
          </div>
        </CardContent>
        {/* Share Button */}
        <CardActions sx={{ marginTop: "-10px" }}>
          <CustomButton name="Add to Cart" />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
