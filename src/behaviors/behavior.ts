import { IDetector } from "../detectors/detector.interface";


abstract class Behavior<T>{
    detectors: IDetector<T>[] = [];

    abstract onEvent(event: T): void;

    addDetectors(detector: IDetector<T>[]) {
        this.detectors.push(...detector);
    }
    removeDetectors(detector: IDetector<T>[]) {
        this.detectors = this.detectors.filter(d => !detector.includes(d));
    }
}

export default Behavior;