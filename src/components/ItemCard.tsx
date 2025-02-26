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
import { cartClick } from "../store/reducers/cartCountSlice";
import { toggleFavourite } from "../store/reducers/userSlice";
import axios from "axios";

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  title,
  price,
  thumbnail,
  rating,
  brand,
  reviews,
  category,
}) => {
  // const { user } = useSelector((state: RootState) => state.user);
  const user = useSelector((state: RootState) => state.user?.user) || {
    favourites: [],
  };
  const dispatch = useDispatch();

  const [value, setValue] = useState<number | null>(rating || 0);

  // Directly derive from Redux state

  const isFav = user.favourites.includes(id);

  // const [isFav, setIsFav] = useState(user.favourites.includes(id)); // Local state

  const handleAddToCart = async (e: React.MouseEvent) => {
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
    const cartList = user.cart || [];
    cartList.push({ productId: item.productid, quantity: item.quantity });
    try {
      await CartService.AddToCart(item);
      await CartService.addToCart(user.id, { cart: cartList });
      dispatch(cartClick());
    } catch (error) {
      console.log(error);
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

  // useEffect(() => {
  //   setIsFav(user.favourites.includes(id));
  // }, [user.favourites]);

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
        display: "flex", // Horizontal layout
        flexDirection: "column",
        justifyContent: "space-evenly",
        // alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: "lightgray",
          border: "1px solid black",
        },
      }}
    >
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
          }}
        >
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
            }}
          >
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
      </CardActionArea>
      <CardActions sx={{ marginTop: "-10px" }}>
        <CustomButton name="Add to Cart" onClick={(e) => handleAddToCart(e)} />
        <CustomButton name="Buy Now" onClick={(e) => handleAddToCart(e)} />
      </CardActions>
    </Card>
  );
};

export default ItemCard;
