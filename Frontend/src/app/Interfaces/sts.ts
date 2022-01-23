import { Client } from './client';

export interface Sts {
  id: number;
  ser: string;
  number: string;
  client_id: number;
  client: Client;
  car_plate: string;
  vin: string;
  model: string;
}
