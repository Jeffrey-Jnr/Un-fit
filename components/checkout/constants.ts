export interface Region {
  name: string;
  tier: number;
  cost: number;
  type: "door-to-door" | "station" | "pickup";
}

export const BASE_BOOK_PRICE = 180;

export const REGIONS: Region[] = [
  { name: "Greater Accra", tier: 1, cost: 30, type: "door-to-door" },
  { name: "Ashanti", tier: 2, cost: 45, type: "station" },
  { name: "Central", tier: 2, cost: 45, type: "station" },
  { name: "Eastern", tier: 2, cost: 45, type: "station" },
  { name: "Western", tier: 2, cost: 45, type: "station" },
  { name: "Volta", tier: 2, cost: 45, type: "station" },
  { name: "Northern", tier: 3, cost: 65, type: "station" },
  { name: "Upper East", tier: 3, cost: 65, type: "station" },
  { name: "Upper West", tier: 3, cost: 65, type: "station" },
  { name: "Bono", tier: 3, cost: 65, type: "station" },
  { name: "Free Pick-up", tier: 0, cost: 0, type: "pickup" },
];
