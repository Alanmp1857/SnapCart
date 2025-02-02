import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Product.css";
import CustomButton from "../../components/CustomButton";
import Divider from "@mui/material/Divider";
import PlusMinusButton from "../../components/PlusMinusButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RatingBar from "../../components/RatingBar";
import React, { useEffect } from "react";
import { ProductProps } from "../../models/Product.interface";
import { useParams } from "react-router";
import ProductService from "../../services/productService";

const Product = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  const [productDetails, setProductDetails] = React.useState<ProductProps>();

  const { id } = useParams();

  const fetchProductDetails = async () => {
    try {
      const response = await ProductService.getProductById(id);
      const data = response.data;
      setProductDetails(data);
    } catch (error) {
      console.error("Fetch failed: ", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <Box
      className="container"
      sx={{
        backgroundColor: backgroundColor,
        color: backgroundColor === "#E3DDFF" ? "black" : "white",
      }}>
      {/* Left Side */}
      <Box className="left-side">
        <img src={productDetails?.images[0]} alt="Scalable" />
        <Box className="images-list">
          {productDetails?.images.map((image, index) => (
            <img key={index} src={image} alt="Scalable" />
          ))}
        </Box>
      </Box>

      {/* Right Side */}
      <Box className="right-side">
        <Box className="product-info">
          <Box>
            <Typography variant="h4">
              {productDetails?.title} | {productDetails?.brand}
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              {productDetails?.description}
            </Typography>
            <RatingBar
              rating={productDetails?.rating}
              reviews={productDetails?.reviews}
            />
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <Typography variant="h5">${productDetails?.price}</Typography>
            <Typography variant="body1">No Cost EMI for 6 months</Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <Typography>Choose Color</Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <PlusMinusButton
              initialValue={productDetails?.minimumOrderQuantity ?? 1} // Fallback to 1 if undefined
              min={productDetails?.minimumOrderQuantity ?? 1} // Same here for min
              max={100}
              onChange={() => {}}
            />
            <Typography>
              Minimum Order Quantity: {productDetails?.minimumOrderQuantity}
            </Typography>
          </Box>

          <Box>
            <CustomButton name={"Buy Now"}></CustomButton>
            <CustomButton name={"Add to Cart"}></CustomButton>
          </Box>

          <Box border={"1px solid #e5e5e5"}>
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <LocalShippingIcon />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Free Delivery</Typography>
                <Typography variant="body1">
                  Enter Postal Code for Delivery
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ backgroundColor: "#e5e5e5" }} />
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <InventoryIcon />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Return Policy</Typography>
                <Typography variant="body1">
                  Free {productDetails?.returnPolicy}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
