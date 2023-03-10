export interface Invitation {
  id: string;
  email: string;
  phoneNumber: string;
  principalGuest: string;
  companions: Array<Companion>;
  seats: number;
  willGo: boolean;
}

export interface Companion {
  name: string;
}
