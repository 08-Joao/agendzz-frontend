import { Duration } from "@/enums/duration";
import { OrganizationSubscription } from "./organization-subscription";
import { SubscriptionPlan } from "./subscription-plan";

export interface SubscriptionPlanOption {
  readonly id: string;
  readonly subscriptionPlanId: string;
  readonly duration: Duration;
  readonly discountPercentage: number;
  readonly finalPrice: number;

  readonly subscriptionPlan: SubscriptionPlan;
  readonly organizationSubscriptions: OrganizationSubscription[];
}