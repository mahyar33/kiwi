export type Flight = {
  id: string;
  cityFrom: string;
  cityTo: string;
  dTime: { time: string; date: string };
  price: number;
};

export type Location = {
  id: number;
  code: string;
  city: string;
  countryName: string;
};

export type BookingParam = {
  value: string;
  display: string;
};

export type Booking<T extends string | BookingParam> = {
  flyFrom: T;
  flyTo: T;
  dateFrom: T;
  dateTo: T;
  partner: 'skypicker';
};

export type ApiObject<T extends Location | Flight> = {
  loading: boolean;
  error: string;
  data: Array<T> | null;
};

export interface BookingState {
  flights: ApiObject<Flight>;
  locations: ApiObject<Location>;
}
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
