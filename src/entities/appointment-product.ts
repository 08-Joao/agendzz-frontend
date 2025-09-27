import { Appointment } from "./appointment";
import { Product } from "./product.entity";

export interface AppointmentProduct {
  readonly id: string;
  readonly appointmentId: string;
  readonly productId: number;

  readonly appointment: Appointment;
  readonly product: Product;
}