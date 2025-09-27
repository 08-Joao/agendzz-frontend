export enum NotificationType {
  // Convites
  INVITATION_RECEIVED = 'INVITATION_RECEIVED', // Você recebeu um convite para uma organização
  INVITATION_ACCEPTED = 'INVITATION_ACCEPTED', // Seu convite foi aceito
  INVITATION_DECLINED = 'INVITATION_DECLINED', // Seu convite foi recusado
  INVITATION_EXPIRED = 'INVITATION_EXPIRED', // Seu convite expirou

  // Agendamentos
  APPOINTMENT_SCHEDULED = 'APPOINTMENT_SCHEDULED', // Novo agendamento criado
  APPOINTMENT_CONFIRMED = 'APPOINTMENT_CONFIRMED', // Agendamento confirmado
  APPOINTMENT_CANCELED = 'APPOINTMENT_CANCELED', // Agendamento cancelado
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER', // Lembrete de agendamento
  APPOINTMENT_NO_SHOW = 'APPOINTMENT_NO_SHOW', // Cliente não compareceu

  // Organização
  USER_JOINED_ORGANIZATION = 'USER_JOINED_ORGANIZATION', // Novo usuário entrou na organização
  USER_LEFT_ORGANIZATION = 'USER_LEFT_ORGANIZATION', // Usuário saiu da organização
  ROLE_CHANGED = 'ROLE_CHANGED', // Seu papel na organização mudou

  // Subscription
  SUBSCRIPTION_EXPIRED = 'SUBSCRIPTION_EXPIRED', // Subscription da organização expirou
  SUBSCRIPTION_RENEWED = 'SUBSCRIPTION_RENEWED', // Subscription renovada
  SUBSCRIPTION_CANCELED = 'SUBSCRIPTION_CANCELED', // Subscription cancelada

  // Sistema
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT', // Anúncios do sistema
  MAINTENANCE_SCHEDULED = 'MAINTENANCE_SCHEDULED', // Manutenção programada

  // Geral
  CUSTOM = 'CUSTOM', // Para notificações personalizadas
}