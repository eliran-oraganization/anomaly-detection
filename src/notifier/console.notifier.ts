import logger from "../logger/logger";
import { INotifier } from "./notifier.interface";


class ConsoleNotifier implements INotifier {
  notifyUser(message: string): void {
    logger.info(`Notification: ${message}`);
  } 
}

export default ConsoleNotifier;