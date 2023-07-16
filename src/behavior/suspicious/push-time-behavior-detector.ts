import { PushPayload } from "../../github/actions.interface";
import BaseBehaviorDetector from "../base-behavior-detector";
import ConsoleNotifier from "../../notifier/console.notifier";


const START_HOUR = 14 * 60 + 0;
const END_HOUR = 16 * 60 + 0;

class PushTimeBehaviorDetector extends BaseBehaviorDetector<PushPayload> {
    detectBehavior(payload: PushPayload): boolean {
        if (this.isPushingCodeDuringSuspiciousTime(payload)) {
            this.notifyUser('Suspicious behavior: pushing code between 14:00-16:00', new ConsoleNotifier());
            return true;
        }
        return false;
    }

    private isPushingCodeDuringSuspiciousTime(payload: PushPayload): boolean {
        const pushTimestampInMilliseconds = new Date(payload.repository.pushed_at * 1000); // convert unix to milliseconds: https://stackoverflow.com/questions/6430126/convert-unix-timestamp-to-milliseconds
        var time = pushTimestampInMilliseconds.getHours() * 60 + pushTimestampInMilliseconds.getMinutes();
        return time >= START_HOUR && time < END_HOUR;
    }

}

export default PushTimeBehaviorDetector;