import { GlobalRole } from "@/enums/globalRole";

export interface GetUserDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly birthDate: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly globalRole: GlobalRole;
}