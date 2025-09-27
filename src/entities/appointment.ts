import { AppointmentStatus } from "@/enums/appointmentStatus";
import { AppointmentProduct } from "./appointment-product";
import { Client } from "./client.entity";
import { Point } from "./point.entity";

export interface Appointment {
  readonly id: string;
  readonly clientId: string;
  readonly pointId: string;
  readonly startAt: Date;
  readonly endAt: Date;
  readonly status: AppointmentStatus;
  readonly subtotal?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly client: Client;
  readonly point: Point;
  readonly appointmentProducts: AppointmentProduct[];
}