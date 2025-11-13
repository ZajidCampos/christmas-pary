export interface GuestInfo {
  name: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
  interestedInSharedAirbnb: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  type: 'general' | 'vip' | 'premium';
  price: number;
  description: string;
  features: string[];
  benefits: string[];
  available: boolean;
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
  interestedInSharedAirbnb: boolean;
  guests?: number;
  guestsList?: GuestInfo[];
  dietaryRestrictions?: string;
  message?: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
  interestedInSharedAirbnb: boolean;
  guests: number;
  guestsList: GuestInfo[];
  dietaryRestrictions?: string;
  message?: string;
}
