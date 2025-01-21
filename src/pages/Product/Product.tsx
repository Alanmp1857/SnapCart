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

const Product = () => {
  const { backgroundColor } = useSelector((state: RootState) => state.theme);

  return (
    <Box
      className="container"
      sx={{
        backgroundColor: backgroundColor,
        color: backgroundColor === "#E3DDFF" ? "black" : "white",
      }}>
      {/* Left Side */}
      <Box className="left-side">
        <img
          src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
          alt="Scalable"
        />
        <Box className="images-list">
          <img
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
            alt="Scalable"
          />
          <img
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
            alt="Scalable"
          />
          <img
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
            alt="Scalable"
          />
          <img
            src="https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg"
            alt="Scalable"
          />
        </Box>
      </Box>

      {/* Right Side */}
      <Box className="right-side">
        <Box className="product-info">
          <Box>
            <Typography variant="h4">Sony Headphones</Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
              ipsa dolores sed laboriosam blanditiis repellat qui quisquam
              soluta harum eius aut nam quos atque possimus magni molestias,
              aliquid, maxime modi?e
            </Typography>
            <RatingBar />
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <Typography variant="h5">$500 or 99/month</Typography>
            <Typography variant="body1">No Cost EMI for 6 months</Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <Typography>Choose Color</Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#e5e5e5" }} />

          <Box>
            <PlusMinusButton
              initialValue={1}
              min={1}
              max={10}
              onChange={() => {}}
            />
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
                  Free 7 days return policy
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
