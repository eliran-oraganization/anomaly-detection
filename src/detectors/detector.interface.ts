export interface IDetector{
    detect<T>(payload: T): boolean;
}

