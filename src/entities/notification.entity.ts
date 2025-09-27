import { NotificationType } from "@/enums/notificationType";

export interface NotificationEntity {
  // Propriedades obrigatórias
   id: string;
   userId: string;
   type: NotificationType;
   title: string;
   message: string;
   isRead: boolean;
   createdAt: Date;
   updatedAt: Date;

   actionUrl?: string | null;
   organizationId?: string | null;
   invitationId?: string | null;
   appointmentId?: string | null;
   expiresAt?: Date | null;


}