import { Organization } from "@/dtos/organization.dto";
import { Product } from "./product.entity";
import { Appointment } from "./appointment";
import { Available } from "./available.entity";
import { Unavailable } from "./unavailable.entity";

export interface Point {
  readonly id: string;
  readonly name: string;
  readonly organizationId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly organization: Organization;
  readonly products: Product[];
  readonly appointments: Appointment[];
  readonly available: Available[];
  readonly unavailable: Unavailable[];
}