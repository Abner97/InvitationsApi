export interface Invitation {
  id: number;
  principalGuest: Guest;
  companions: Array<Guest>;
  seats: number;
  willGo: boolean;
}

export interface Guest {
  name: string;
  email?: string;
  phoneNumber?: string;
}
