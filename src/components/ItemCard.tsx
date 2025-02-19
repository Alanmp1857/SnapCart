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
import CartService from "../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUser, toggleFavourite } from "../store/reducers/userSlice";
import { cartClick } from "../store/reducers/cartCountSlice";

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  thumbnail,
  rating,
  brand,
  reviews,
  category,
  onRemove,
  isFavourite,
}) => {
  const [value, setValue] = useState<number | null>(rating || 0);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user?.user) || {
    favourites: [],
  };

  // Get the favourite state from Redux
  // const isFavourite = user.favourites.includes(id);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (!user || !user.email) {
      console.error("User not logged in");
      return;
    }
    const item = {
      userId: user.id,
      email: user.email,
      productid: id,
      title,
      price,
      thumbnail,
      quantity: 1,
    };
    console.log(item);
    CartService.AddToCart(item);
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
        border: "1px solid #e0e2e4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
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
        <IconButton
          aria-label="add to favorites"
          disableRipple
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "transparent" },
          }}>
          <FavoriteIcon />
        </IconButton>

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

        <CardContent sx={{ backgroundColor: "transparent" }}>
          <Typography variant="h6">
            {title.length > 20
              ? title.slice(0, 20) + "..."
              : title.slice(0, 20)}{" "}
            | {brand}
          </Typography>
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
      </CardActionArea>
      <CardActions sx={{ marginTop: "-10px" }}>
        <CustomButton name="Add to Cart" onClick={(e) => e.stopPropagation()} />
        <CustomButton name="Buy Now" onClick={(e) => e.stopPropagation()} />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
