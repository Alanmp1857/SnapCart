import axios from "axios"
import { CartItem } from "../models/CartItem.interface"

const GetAllCartItems = async (): Promise<CartItem[]> => {
    try {
        const response = await axios.get("http://localhost:4000/cartdata");
        return response.data; // Assuming the response data is an array of CartItem
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const AddToCart = async (item: any) => {
    try {
        const exists = await IsExisting(item);
        if (exists.exists) {
            return updateCart(item, exists.quantity + item.quantity, exists.id);
        }
        return axios.post("http://localhost:4000/cartdata", item);
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Function to update an existing cart item
const updateCart = (item: any, quantity: number, cartId: string) => {
    return axios.put(`http://localhost:4000/cartdata/${cartId}`, {
        ...item,
        quantity:quantity
    });
};

// Function to delete an item from the cart
const DeleteCartItem = (id: string) => {
    return axios.delete(`http://localhost:4000/cartdata/${id}`);
};

// Interface to describe the response of IsExisting
interface CartId {
    id: string;
    exists: boolean;
    quantity: number;
}

// Function to check if an item already exists in the cart
const IsExisting = async (item: any): Promise<CartId> => {
    try {
        const cartItems = await GetAllCartItems();
        const existingItem = cartItems.find((cart:CartItem) => cart.productid === item.productid && cart.email === item.email);
        if (existingItem) {
            return {
                id: existingItem.id,
                exists: true,
                quantity: existingItem.quantity
            };
        }
        return {
            id: "",
            exists: false,
            quantity: 0
        };
    } catch (error) {
        console.error('Error checking if item exists:', error);
        throw error;
    }
};

const CartService = {
    GetAllCartItems,
    AddToCart,
    DeleteCartItem,
    updateCart
}

export default CartService