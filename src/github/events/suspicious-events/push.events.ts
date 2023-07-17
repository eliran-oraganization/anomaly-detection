import { IDetector } from '../../../detectors/detector.interface';
import SuspiciousEvents from '../events';

class PushSuspiciousEvents extends SuspiciousEvents<number> {


    addDetectors(detector: IDetector[]) {
        this.detectors.concat(detector);
    }



}

export default PushSuspiciousEvents;