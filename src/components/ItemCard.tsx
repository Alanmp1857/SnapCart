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

const ItemCard = () => {
  const [value, setValue] = useState<number | null>(2);
  return (
    <Card
      sx={{
        maxWidth: 250,
        position: "relative",
        boxShadow: "none",
        border: "1px solid #e0e2e4",
      }}>
      {" "}
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
          height="180"
          image="https://wallpapers.com/images/featured/earphone-png-wf7u4siupfmxxyog.jpg"
          alt="earphone"
          sx={{
            objectFit: "contain",
            backgroundColor: "#e0e2e4",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        />

        {/* Product Details */}
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5">
              Earphone
            </Typography>
            <Typography gutterBottom variant="h5">
              $90.00
            </Typography>
          </div>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Best Quality Earphones
          </Typography>
          <div style={{ display: "flex" }}>
            <Rating
              name="simple-controlled"
              sx={{ paddingTop: 1 }}
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue);
              }}
            />
            <p>(121)</p>
          </div>
        </CardContent>
      </CardActionArea>
      {/* Share Button */}
      <CardActions>
        <CustomButton name="Add to Cart" />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
