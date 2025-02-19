export interface Review {
  rating?: number;
  comment?: string;
  date: string;
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
