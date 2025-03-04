import React, { useEffect, useState } from "react";
import CartItems from "./CartItems/CartItems";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./Checkout.css"; // Import external CSS
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EmptyCart from "./EmptyCart/EmptyCart";
import { cartClick } from "../../store/reducers/cartCountSlice";
import ProductService from "../../services/productService";
import { Box, Typography } from "@mui/material";

const Checkout: React.FC = () => {
  const [cartList, setCartList] = useState<any[]>([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { backgroundColor, theme } = useSelector(
    (state: RootState) => state.theme
  );

  const fetchCartList = async () => {
    try {
      const updatedCartList = [];

      // Use for...of to handle async operations properly within a loop
      for (const item of user?.cart || []) {
        const response = await ProductService.getProductById(item.productId);
        const product = response.data;
        console.log("Response : ", response.data);

        const data = {
          userId: user.id,
          email: user.email,
          productid: product.id, // Use actual product ID
          title: product.title, // Use actual product title
          price: product.price, // Use actual product price
          thumbnail: product.thumbnail, // Use actual product thumbnail
          quantity: item.quantity, // Assuming quantity is part of the cart item
        };

        updatedCartList.push(data);
      }

      // Set the cart list with all the updated items
      setCartList(updatedCartList);
      console.log(updatedCartList);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const RefreshData = () => {
    dispatch(cartClick());
  };

  useEffect(() => {
    user.id && fetchCartList();
  }, [user]);

  return (
    <Box sx={{ backgroundColor: backgroundColor }}>
      <Typography
        variant="h4"
        sx={{
          padding: "20px 0px 0px 160px",
          color: theme === "dark" ? "white" : "black",
        }}>
        Your Orders
      </Typography>
      <div className="checkout-container">
        {user.email && cartList.length > 0 ? (
          <>
            {/* Left Section - Cart and Delivery Info */}
            <div className="checkout-left">
              <CartItems cartList={cartList} refreshData={RefreshData} />
              <DeliveryInfo />
            </div>

            {/* Right Section - Order Summary */}
            <div className="checkout-right">
              <OrderSummary cartList={cartList} refreshData={RefreshData} />
            </div>
          </>
        ) : (
          <EmptyCart isLoggedin={user.email ? true : false} />
        )}
      </div>
    </Box>
  );
};

export default Checkout;
