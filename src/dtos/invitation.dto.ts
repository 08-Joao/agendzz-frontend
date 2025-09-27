import { InvitationStatus } from "@/enums/invitationStatus";
import { OrganizationRole } from "@/enums/organizationRole";
import { GetUserDto } from "./get.user.dto";
import { Organization } from "./organization.dto";

export interface Invitation {
  readonly id: string;
  readonly email: string;
  readonly organizationId: string;
  readonly invitedByUserId: string;
  readonly invitedUserId: string;
  readonly role: OrganizationRole;
  readonly token: string;
  readonly status: InvitationStatus;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  // Relacionamentos opcionais
  readonly organization?: Organization;
  readonly invitedBy?: GetUserDto;
  readonly invitedUser?: GetUserDto;
}