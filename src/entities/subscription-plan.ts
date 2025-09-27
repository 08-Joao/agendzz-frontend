import { OrganizationSubscription } from "./organization-subscription";
import { SubscriptionPlanOption } from "./subscription-plan-option";

export interface SubscriptionPlan {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly basePrice: number;
  readonly isActive: boolean;
  readonly features: string[];
  readonly maxPointsPerOrg?: number;
  readonly maxUsersPerOrg?: number;
  readonly maxAppointmentsPerMonth?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly subscriptionOptions: SubscriptionPlanOption[];
  readonly organizationSubscriptions: OrganizationSubscription[];
}