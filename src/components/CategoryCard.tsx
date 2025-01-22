import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

interface CategoryCardProps {
  name: string;
  itemsAvailable: number;
  imageLink: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  itemsAvailable,
  imageLink,
}) => {
  return (
    <Card
      sx={{
        width: 400,
        boxShadow: "none",
        border: "1px solid #e0e2e4",
        display: "flex", // Horizontal layout
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: "lightgray",
          border: "1px solid black",
        },
      }}
    >
      <CardActionArea
        disableRipple
        sx={{
          display: "flex", // Align items horizontally
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%", // Ensure the card action area takes full height
        }}
      >
        {/* Image Section */}
        <CardMedia
          component="img"
          image={imageLink}
          alt={name}
          sx={{
            width: 120, // Fixed width for all images
            height: "100%", // Image takes full card height
            objectFit: "contain",
            padding: 1,
          }}
        />

        {/* Text Section */}
        <CardContent
          sx={{
            flex: 1, // Fill remaining space
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center text vertically
            textAlign: "left",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: 18,
              whiteSpace: "nowrap", // Prevent text wrapping
              overflow: "hidden",
              textOverflow: "ellipsis", // Handle long text
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {itemsAvailable} Items Available
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
