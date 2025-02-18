import React, { useEffect, useState } from "react";
import CartItems from "./CartItems/CartItems";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./Checkout.css"; // Import external CSS
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartService from "../../services/CartService";
import EmptyCart from "./EmptyCart/EmptyCart";
import { cartClick } from "../../store/reducers/cartCountSlice";

const Checkout: React.FC = () => {
  const [cartList, setCartList] = useState<any[]>([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const { cartClickCount } = useSelector((state: RootState) => state.cartCount);

  const getAllCartItems = async (userId: string) => {
    try {
      const cartItems = await CartService.GetAllCartItems();
      console.log(cartItems.data, " hHi", userId);
      setCartList(cartItems.data.filter((item: any) => item.userId === userId));
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setCartList([]); // Ensure state remains an empty array on failure
    }
  };

  const RefreshData = () => {
    getAllCartItems(user.id);
    dispatch(cartClick());
  };

  useEffect(() => {
    user.id && getAllCartItems(user.id);
  }, [user, cartClickCount]);

  return (
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
            <OrderSummary cartList={cartList} />
          </div>
        </>
      ) : (
        <EmptyCart isLoggedin={user.email ? true : false} />
      )}
    </div>
  );
};

export default Checkout;
