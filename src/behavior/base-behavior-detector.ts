import { Notifier } from "../notifier/base.notifier";



export interface BehaviorDetector<T> {
    detectBehavior(payload: T): boolean;
}


abstract class BaseBehaviorDetector<T> implements BehaviorDetector<T> {
    abstract detectBehavior(payload: T): boolean;

    protected notifyUser(message: string, notifier: Notifier): void {
        notifier.notifyUser(message);
    }
}

export default BaseBehaviorDetector;