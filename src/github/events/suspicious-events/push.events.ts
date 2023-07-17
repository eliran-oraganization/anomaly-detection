import { PushPayload } from '../../actions.interface';
import SuspiciousEvents from '../events';

class PushSuspiciousEvents extends SuspiciousEvents<PushPayload> {

}

export default PushSuspiciousEvents;