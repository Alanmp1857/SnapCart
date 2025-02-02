import { Review } from "./SearchCard.interface";

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
}
