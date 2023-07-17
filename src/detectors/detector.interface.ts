export interface IDetector<T>{
    detect(payload: T): boolean;
}

