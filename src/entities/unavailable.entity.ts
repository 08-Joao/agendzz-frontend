import { Point } from "./point.entity";

export interface Unavailable {
  readonly id: number;
  readonly startTimeInMinutes: number;
  readonly endTmeInMinutes: number;
  readonly startDay: Date;
  readonly endDay: Date;
  readonly reason: string;
  readonly pointId: string;

  readonly point: Point;
}