import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ItemCard from "../../components/ItemCard";
import { Container, Typography, Button, Grid2, Box } from "@mui/material";
import { toggleFavourite } from "../../store/reducers/userSlice";
import { ItemCardProps } from "../../models/ItemCard.interface";
import EmptyFavourite from "./EmptyFavourite/EmptyFavourite";

const FavouritesPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  const [favProducts, setFavProducts] = useState<ItemCardProps[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      if (!user || !user.favourites.length) {
        setFavProducts([]);
        return;
      }

      try {
        const responses = await Promise.all(
          user.favourites.map((id) =>
            fetch(`http://localhost:4000/products/${id}`).then((res) =>
              res.json()
            )
          )
        );

        setFavProducts(responses);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchFavouriteProducts();
  }, [user.favourites]);

  const handleRemoveFromFavourites = async (productId: string) => {
    if (!user || !user.id) return;

    // Check if the product exists in user's favourites before removing
    if (!user.favourites.includes(productId)) {
      console.warn("Product not found in favourites.");
      return;
    }

    const updatedFavourites = user.favourites.filter((id) => id !== productId);

    try {
      // Send PATCH request to update favourites in backend
      await fetch(`http://localhost:4000/userdata/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favourites: updatedFavourites }),
      });

      // Update Redux store (remove from user.favourites)
      dispatch(toggleFavourite(productId));

      // Immediately update local state (UI reflects change instantly)
      setFavProducts((prev) => prev.filter((fav) => fav.id !== productId));
    } catch (error) {
      console.error("Failed to remove favourite:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor }}>
      {!user.email ? (
        <EmptyFavourite isLoggedin={user.email ? true : false} />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Favourites
          </Typography>
          {favProducts.length === 0 ? (
            <Typography>No favourite products yet.</Typography>
          ) : (
            <Grid2 container spacing={3}>
              {favProducts.map((fav) => (
                <Grid2 key={fav.id}>
                  <ItemCard
                    {...fav}
                    isFavourite={favProducts.some(
                      (product) => product.id === fav.id
                    )}
                    onRemove={() => handleRemoveFromFavourites(fav.id)}
                  />
                  <Button onClick={() => handleRemoveFromFavourites(fav.id)}>
                    Remove
                  </Button>
                </Grid2>
              ))}
            </Grid2>
          )}
        </>
      )}
    </Box>
  );
};

export default FavouritesPage;
