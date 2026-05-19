export interface NotificationMessage {
  id: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}
