import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Box, Typography } from "@mui/material";

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user.orders);

  return (
    <Box>
      {user ? (
        <>
          <Typography sx={{fontFamily:"arial",mb:2, fontSize:"30px" }}>My Orders</Typography>
          {user.orders.map((order: any) => (
            <Box
              sx={{ display: "flex",justifyContent:"space-between", bgcolor: "skyblue", padding: 3, mb: 2 }}
            >
              {order.map((item: any) => (
                <>
                  <Box>{item.productId} - {item.quantity}</Box>
                </>
              ))}
            </Box>
          ))}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Orders;
