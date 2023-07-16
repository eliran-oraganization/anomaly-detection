import PushTimeBehaviorDetector from '../../../behavior/suspicious/push-time-behavior-detector';
import { PushPayload } from '../../actions.interface';
import Events from '../events';

class PushSuspiciousEvents extends Events<PushPayload> {

    constructor() {
        super();
        this.behaviorDetectors.push(
            new PushTimeBehaviorDetector()
        )
    }


}

export default PushSuspiciousEvents;