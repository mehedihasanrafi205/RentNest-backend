export type TPropertyPayload = {
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities?: string[];
  images?: string[];
};

export type TPropertyFilterRequest = {
  search?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  amenities?: string;
};