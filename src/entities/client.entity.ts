import { Appointment } from "./appointment";

export interface Client {
  readonly id: string;
  readonly name?: string;
  readonly phoneNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly appointments: Appointment[];
}