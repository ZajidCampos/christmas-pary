export interface GuestInfo {
  name: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
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
  guests: number;
  guestsList: GuestInfo[];
  dietaryRestrictions?: string;
  message?: string;
}
