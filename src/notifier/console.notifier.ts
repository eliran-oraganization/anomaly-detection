import logger from "../logger/logger";
import { Notifier } from "./base.notifier";


class ConsoleNotifier implements Notifier {
  notifyUser(message: string): void {
    logger.info(`Notification: ${message}`);
  }
}

export default ConsoleNotifier;