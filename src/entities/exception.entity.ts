import { ExceptionType } from "@/enums/exceptionType";
import { Point } from "./point.entity";
export interface ExceptionEntity {
  readonly id: string;
  readonly pointId: string;
  readonly point?: Point;
  readonly type: ExceptionType;
  readonly date: Date | null;
  readonly startTime: number | null;
  readonly endTime: number | null;
  readonly reason: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}