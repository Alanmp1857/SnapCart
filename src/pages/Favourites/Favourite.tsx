import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ItemCard from "../../components/ItemCard";
import { Container, Typography, Grid2, Button } from "@mui/material";
import { setUser } from "../../store/reducers/userSlice";
import { ItemCardProps } from "../../models/ItemCard.interface";

const FavouritesPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [favProducts, setFavProducts] = useState<ItemCardProps[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      if (!user.favourites.length) {
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

  const handleRemoveFromFavourites = async (id: string) => {
    console.log(`Removing product with id: ${id} for user: ${user.id}`);

    const url = `http://localhost:4000/userdata/${user.id}`;
    console.log(`Making PATCH request to: ${url}`); // Log the URL

    // Remove the product id from the user's favourites array
    const updatedFavourites = user.favourites.filter(
      (favId) => favId !== JSON.stringify(id)
    ); // Convert to number

    try {
      // Send a PATCH request to update the user's favourites
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favourites: updatedFavourites }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(setUser(updatedUser));
      } else {
        console.error("Error removing favourite:", response.status);
      }
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Favourites
      </Typography>
      {favProducts.length === 0 ? (
        <Typography>No favourite products yet.</Typography>
      ) : (
        <Grid2 container spacing={3}>
          {favProducts.map((fav) => (
            <Grid2 item key={fav.id} xs={12} sm={6} md={4}>
              <ItemCard
                {...fav}
                isFavourite={user.favourites.includes(fav.id)}
                onRemove={() => handleRemoveFromFavourites(fav.id)}
              />
              <Button onClick={() => handleRemoveFromFavourites(fav.id)}>
                Remove
              </Button>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  );
};

export default FavouritesPage;
