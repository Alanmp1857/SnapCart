import React from "react";
import CartItems from "./CartItems";
import DeliveryInfo from "./DeliveryInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import "./Checkout.css"; // Import external CSS

const Checkout: React.FC = () => {
  return (
    <div className="checkout-container">
      {/* Left Section - Cart and Delivery Info */}
      <div className="checkout-left">
        <CartItems />
        <DeliveryInfo />
      </div>

      {/* Right Section - Order Summary */}
      <div className="checkout-right">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
