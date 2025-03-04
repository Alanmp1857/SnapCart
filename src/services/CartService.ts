import axios from "axios";

const BASE_URL = "http://localhost:4000/userdata";

// Add item to cart
const addToCart = (userId: string, cart: { productId: string; quantity: number }[]) => {
  return axios.patch(`${BASE_URL}/${userId}`, { cart }); // Send entire cart array
};


// Update quantity of a cart item
const updateCartQuantity = async (
  userId: string,
  productId: string,
  newQuantity: number
) => {
  try {
    return axios.patch(`${BASE_URL}/${userId}`, {
      cart: [{ productId, quantity: newQuantity }],
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};


// Remove an item from the cart
const removeFromCart = async (userId: string, productId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    const userData = response.data;

    const updatedCart = userData.cart.filter(
      (item: any) => item.productId !== productId
    );

    return axios.patch(`${BASE_URL}/${userId}`, { cart: updatedCart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Remove all items from the cart
const clearCart = async (userId: string) => {
  try {
    return axios.patch(`${BASE_URL}/${userId}`, { cart: [] });
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

const CartService = {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};

export default CartService;
