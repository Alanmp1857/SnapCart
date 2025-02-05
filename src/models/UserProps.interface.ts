export interface AddressProps {
  city: string;
  state: string;
  zipCode: string;
  mobile: string;
}

export interface UserProps {
  id: string;
  username: string;
  address: AddressProps[];
  email: string;
  password: string;
}
