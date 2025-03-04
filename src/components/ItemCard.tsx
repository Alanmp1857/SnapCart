import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomButton from "./CustomButton";
import { ItemCardProps } from "../models/ItemCard.interface";
import CartService from "../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { cartClick } from "../store/reducers/cartCountSlice";
import { toggleFavourite, addCart } from "../store/reducers/userSlice";
import axios from "axios";
import RatingBar from "./RatingBar";
import { useState } from "react";

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  thumbnail,
  rating,
  reviews,
  category,
}) => {
  const user = useSelector((state: RootState) => state.user?.user) || {
    favourites: [],
  };
  const { theme } = useSelector((state: RootState) => state.theme);
  const cardColor = theme === "dark" ? "#1E1E1E" : "#FFFFFF";
  const cardShadow =
    theme === "dark"
      ? "0 4px 10px rgba(255,255,255,0.1)"
      : "0 4px 10px rgba(0,0,0,0.1)";
  const fontColor = theme === "dark" ? "white" : "black";
  const hoverColor = theme === "dark" ? "#292929" : "#F0F0F0";

  const dispatch = useDispatch();
  const [value, setValue] = useState<number | null>(rating || 0);
  // Directly derive from Redux state
  const isFav = user.favourites.includes(id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newItem = {
      productId: id,
      quantity: 1,
    };

    dispatch(addCart(newItem));

    const updatedCart = [...(user.cart || []), newItem]; // Create a new array to avoid mutation

    try {
      await CartService.addToCart(user.id, updatedCart); // Send the updated cart list
      dispatch(cartClick());
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavouriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }

    try {
      const productIdString = String(id);
      let updatedFavourites;

      if (isFav) {
        // Remove from favourites
        updatedFavourites = user.favourites.filter(
          (favId) => favId !== productIdString
        );
      } else {
        // Add to favourites
        updatedFavourites = [...user.favourites, productIdString];
      }

      // Update backend
      await axios.patch(`http://localhost:4000/userdata/${user.id}`, {
        favourites: updatedFavourites,
      });

      // Update Redux store
      dispatch(toggleFavourite(productIdString));
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        maxHeight: 400,
        height: "380px",
        width: "300px",
        position: "relative",
        boxShadow: "none",
        display: "flex", // Horizontal layout
        flexDirection: "column",
        justifyContent: "space-evenly",
        // alignItems: "center",
        overflow: "hidden",
        backgroundColor: cardColor,
        WebkitBoxShadow: cardShadow,
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: hoverColor,
        },
      }}>
      {/* Ensure relative positioning for absolute children */}
      <CardActionArea disableRipple>
        {/* Favorite Icon Positioned Over Image */}
        <IconButton
          aria-label="add to favorites"
          disableRipple
          onClick={handleFavouriteToggle}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "transparent" },
          }}>
          <FavoriteIcon sx={{ color: isFav ? "red" : "gray" }} />
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
            <Typography variant="h6" sx={{ color: fontColor }}>
              {title.length > 20
                ? title.slice(0, 20) + "..."
                : title.slice(0, 20)}{" "}
            </Typography>
          </div>
          <Typography variant="h6" sx={{ color: fontColor }}>
            ${price}
          </Typography>
          <Typography variant="body2" sx={{ color: fontColor }}>
            {category}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: 2,
            }}>
            <RatingBar rating={rating} reviews={reviews} readOnly />
          </div>
        </CardContent>
        {/* Share Button */}
      </CardActionArea>
      <CardActions sx={{ marginTop: "-10px" }}>
        <CustomButton name="Add to Cart" onClick={(e) => handleAddToCart(e)} />
        <CustomButton name="Buy Now" onClick={(e) => handleAddToCart(e)} />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
