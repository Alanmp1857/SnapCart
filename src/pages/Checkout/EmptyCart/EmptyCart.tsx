import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export interface EmptyCartProps {
  isLoggedin: boolean;
}

const EmptyCart = ({ isLoggedin }: EmptyCartProps) => {
    const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
        Your Cart is Empty
      </Typography>
      <img
        src="https://imgs.search.brave.com/PQjRtu5e0vNMbWkufqsBX-L3ESfk5tSuTZkTt9T0bMk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzczLzE1Lzkx/LzM2MF9GXzczMTU5/MTY2X3ViN0hEVVdl/UDRMM250Wk5NWk9F/QmtSOG5maU1vMTRa/LmpwZw"
        alt=""
        width="50%"
        style={{ margin: "20px 0px" }}
      />
      {isLoggedin ? (
        <Box sx={{ display: "inline-flex", alignItems: "center",justifyContent:"center" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
              mr: "15px",
            }}
          >
            Start adding Products
          </Typography>
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              padding:"5px 20px",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "5px",
            }}
            onClick={()=>navigate("/")}
          >
            Go to Homepage
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "inline-flex" }}>
          <Button
            sx={{
              backgroundColor: "yellow",
              color: "black",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "25px",
            }}
          >
            Sign in to your Account
          </Button>
          <Button
            sx={{
              ml: "15px",
              backgroundColor: "white",
              color: "black",
              boxShadow: "0px 0px 3px gray",
              borderRadius: "25px",
            }}
          >
            SignUp
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EmptyCart;
