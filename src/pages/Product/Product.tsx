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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Product = () => {
  const { backgroundColor, theme } = useSelector(
    (state: RootState) => state.theme
  );

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        color: theme === "dark" ? "white" : "black",
        paddingBottom: "20px",
        paddingLeft: "20px",
      }}>
      <Box className="container">
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5">${productDetails?.price}</Typography>
                <Typography
                  sx={{
                    ml: 1,
                    backgroundColor: "green",
                    borderRadius: 1,
                    px: "5px",
                  }}
                  variant="h6">
                  {productDetails?.discountPercentage}% off
                </Typography>
              </Box>
              <Typography variant="body1">No Cost EMI for 6 months</Typography>
            </Box>

            <Divider sx={{ backgroundColor: "#e5e5e5" }} />

            <Box>
              <PlusMinusButton
                initialValue={productDetails?.minimumOrderQuantity ?? 1} // Fallback to 1 if undefined
                min={productDetails?.minimumOrderQuantity ?? 1} // Same here for min
                max={100}
                onChange={() => {}}
              />
              <Typography sx={{ mt: 1 }}>
                Minimum Order Quantity: {productDetails?.minimumOrderQuantity}
              </Typography>
            </Box>

            <Box>
              <CustomButton name={"Buy Now"} onClick={() => {}}></CustomButton>
              <CustomButton
                name={"Add to Cart"}
                onClick={() => {}}></CustomButton>
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
                    {productDetails?.returnPolicy}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">Customer Reviews</Typography>
        <Box>
          {productDetails?.reviews.map((review) => (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}>
                <AccountCircleIcon />
                <Typography sx={{ ml: 1, mr: 3, fontWeight: "bold" }}>
                  {review.reviewerName}
                </Typography>
                <RatingBar
                  rating={review.rating}
                  reviews={productDetails?.reviews}
                />
              </Box>
              <Typography variant="body2">
                Reviewed on {formatDate(review.date)}
              </Typography>
              <Typography sx={{ mt: 1, mb: 1 }}>{review.comment}</Typography>
              <Divider
                sx={{ backgroundColor: "#e5e5e5", width: "50%", mb: 2 }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
