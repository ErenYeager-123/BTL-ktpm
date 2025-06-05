export interface Field {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  pricePerHour: number;
  size: string; // e.g., "5-a-side", "7-a-side", "11-a-side"
  amenities: string[];
  isAvailable: boolean;
}