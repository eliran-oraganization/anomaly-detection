import { BehaviorDetector } from "../../behavior/base-behavior-detector";




abstract class Events<T> {
    protected behaviorDetectors: BehaviorDetector<T>[] = [];

    onEvent(event: T) {
        this.behaviorDetectors.forEach(detector => detector.detectBehavior(event));
    }

}

export default Events;