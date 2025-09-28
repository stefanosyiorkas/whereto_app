export interface Venue {
  id: number;
  name: string;
  type: string;
  cuisine: string;
  location: string;
  rating: number;
  priceRange: string;
  hours: string;
  phone?: string;
  website?: string;
  image: string;
  description: string;
}

export interface Event {
  id: number;
  name: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  genre: string;
  price: string;
  capacity: number;
  image: string;
  description: string;
}