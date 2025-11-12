export interface RSVP {
  id: string;
  name: string;
  email: string;
  city: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
  guests?: number;
  dietaryRestrictions?: string;
  message?: string;
}

export interface RSVPFormData {
  name: string;
  email: string;
  city: string;
  needsAccommodation: boolean;
  interestedInTequilaTour: boolean;
  guests: number;
  dietaryRestrictions?: string;
  message?: string;
}
