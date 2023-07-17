
import { IDetector } from "../../detectors/detector.interface";
import ConsoleNotifier from "../../notifier/console.notifier";
import { INotification, INotifier } from "../../notifier/notifier.interface";


class SuspiciousEvents<T> implements INotification {

    protected detectors: IDetector<T>[] = [];

    onEvent(event: T) {
        this.detectors.forEach(detector => {
            if (detector.detect(event)) {
                this.notifyUser('## Suspicious event detected ##', new ConsoleNotifier());
                this.notifyUser(JSON.stringify(event), new ConsoleNotifier());
            }
        });
    }

    removeDetectors(detector: IDetector<T>[]) { 
        this.detectors = this.detectors.filter(d => !detector.includes(d));
    }

    notifyUser(message: string, notifier: INotifier): void {
        notifier.notifyUser(message);
    }

    addDetectors(detector: IDetector<T>[]) {
        this.detectors.push(...detector);
    }

}

export default SuspiciousEvents;