import { Point } from "@/entities/point.entity";
import { ProductOrganization } from "@/entities/product-organization";

export interface Organization {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly userOrganizations?: [];
  readonly points?: Point[];
  readonly productOrganizations?: ProductOrganization[];
  readonly organizationSubscription?: Organization;
}