export interface Venue {
  id: string;
  name: string;
  description?: string;
  city: string;
  capacity: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVenueInput {
  name: string;
  description?: string;
  city: string;
  capacity: number;
  pricePerNight: number;
  images: string[];
  amenities: string[];
}

export interface UpdateVenueInput extends Partial<CreateVenueInput> {}

export interface VenueFilterParams {
  city?: string;
  minCapacity?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// O(1) access utility types
export type VenuePreview = Pick<
  Venue,
  "id" | "name" | "city" | "capacity" | "pricePerNight" | "images"
>;
export type VenueDetails = Omit<Venue, "createdAt" | "updatedAt">;
