export interface AddressProps {
  city: string;
  state: string;
  zipCode: string;
  mobile: string;
}

export interface OrderProps {
  productId: string;
  quantity: number;
}

export interface UserProps {
  id: string;
  username: string;
  address: AddressProps[];
  email: string;
  password: string;
  wallet: number;
  favourites: string[];
  orders: OrderProps[][];
  cart: OrderProps[];
}
