import { Organization } from "@/dtos/organization.dto";
import { Product } from "./product.entity";
import { Appointment } from "./appointment";
import { AvailabilityEntity } from "./availability.entity";
import { ExceptionEntity } from "./exception.entity";

export interface Point {
  readonly id: string;
  readonly name: string;
  readonly organizationId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly organization: Organization;
  readonly products: Product[];
  readonly appointments: Appointment[];
  readonly availability: AvailabilityEntity[];
  readonly exceptions: ExceptionEntity[];
}