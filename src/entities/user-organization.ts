import { GetUserDto } from "@/dtos/get.user.dto";
import { Organization } from "@/dtos/organization.dto";
import { OrganizationRole } from "@/enums/organizationRole";

export interface UserOrganization {
  readonly id: string;
  readonly userId: string;
  readonly organizationId: string;
  readonly role: OrganizationRole;
  readonly joinedAt: Date;

  readonly user?: GetUserDto;
  readonly organization?: Organization;
}