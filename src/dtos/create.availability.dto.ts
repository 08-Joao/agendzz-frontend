export interface CreateAvailabilityDto {
  pointId: string;
  dayOfWeek: number; // 0 (domingo) a 6 (sábado)
  startTime: number; // 0 a 1439 (minutos desde meia-noite)
  endTime: number;   // 0 a 1439
}