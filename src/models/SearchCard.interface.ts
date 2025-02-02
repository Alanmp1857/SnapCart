export interface Review {
  rating?: number;
  comment?: string;
  date?: string; // Assuming the date is in ISO 8601 string format
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface SearchCardProps {
  id?: string | undefined;
  images: string[];
  title: string;
  price: number;
  rating?: number;
  reviews?: Review[];
}
