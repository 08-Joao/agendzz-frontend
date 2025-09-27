import { AppointmentProduct } from "./appointment-product";
import { Point } from "./point.entity";
import { ProductOrganization } from "./product-organization";

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly duration: number;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly points: Point[];
  readonly productOrganizations: ProductOrganization[];
  readonly appointmentProducts: AppointmentProduct[];
}