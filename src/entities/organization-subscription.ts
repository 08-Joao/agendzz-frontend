import { GetUserDto } from "@/dtos/get.user.dto";
import { Organization } from "@/dtos/organization.dto";
import { SubscriptionStatus } from "@/enums/subscriptionStatus";
import { SubscriptionPlan } from "./subscription-plan";
import { SubscriptionPlanOption } from "./subscription-plan-option";

export interface OrganizationSubscription {
  readonly id: string;
  readonly organizationId: string;
  readonly subscriptionPlanId: string;
  readonly subscriptionPlanOptionId: string;
  readonly status: SubscriptionStatus;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly autoRenew: boolean;
  readonly additionalDiscountPct?: number;
  readonly finalPaidAmount: number;
  readonly paymentId?: string;
  readonly paymentMethod?: string;
  readonly paidByUserId?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly organization: Organization;
  readonly subscriptionPlan: SubscriptionPlan;
  readonly subscriptionPlanOption: SubscriptionPlanOption;
  readonly paidByUser?: GetUserDto;
}