import { Review } from "./SearchCard.interface";

export interface ItemCardProps {
  id: string;
  title: string;
  price?: number;
  thumbnail?: string;
  rating?: number;
  reviews?: Review[];
  discountPercentage?: number;
  tags?: string[];
  brand?: string;
  category?: string;
  onRemove?: () => void;
  isFavourite?: boolean;
}
