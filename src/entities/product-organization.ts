import { Organization } from "@/dtos/organization.dto";
import { Product } from "./product.entity";

export interface ProductOrganization {
  readonly id: string;
  readonly productId: number;
  readonly organizationId: string;
  readonly isActive: boolean;
  readonly customPrice?: number;
  readonly addedAt: Date;

  readonly product: Product;
  readonly organization: Organization;
}