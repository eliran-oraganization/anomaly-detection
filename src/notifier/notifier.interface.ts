export interface INotifier {
  notifyUser(message: string): void;
}

export interface INotification {
  notifyUser(message: string, notifier: INotifier): void;
}
