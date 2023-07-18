
import ConsoleNotifier from "../notifier/console.notifier";
import { INotification, INotifier } from "../notifier/notifier.interface";
import Behavior from "./behavior";


class Suspicious<T> extends Behavior<T> implements INotification {

    onEvent(event: T) {
        this.detectors.forEach(detector => {
            if (detector.detect(event)) {
                this.notifyUser('## Suspicious event detected ##', new ConsoleNotifier());
                this.notifyUser(JSON.stringify(event), new ConsoleNotifier());
            }
        });
    }

    notifyUser(message: string, notifier: INotifier): void {
        notifier.notifyUser(message);
    }


}

export default Suspicious;