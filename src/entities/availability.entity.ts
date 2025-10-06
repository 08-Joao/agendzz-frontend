import { Point } from "./point.entity";
export interface AvailabilityEntity {
  readonly id: string;
  readonly pointId: string;
  readonly point?: Point;
  readonly dayOfWeek: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}