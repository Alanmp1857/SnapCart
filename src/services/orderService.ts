import axios from "axios";

const BASE_URL = "http://localhost:4000/userdata";

const addOrders = (userId:string,orders: any) => {
  return axios.patch(BASE_URL+"/"+userId, orders);
};

const orderService = { addOrders };

export default orderService;