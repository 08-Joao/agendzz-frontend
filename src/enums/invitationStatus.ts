export enum InvitationStatus {
  PENDING  = 'PENDING',// Convite enviado, aguardando resposta
  ACCEPTED = 'ACCEPTED', // Convite aceito
  DECLINED = 'DECLINED', // Convite recusado
  EXPIRED  = 'EXPIRED',// Convite expirado
  CANCELED = 'CANCELED', // Convite cancelado pelo remetente
}
