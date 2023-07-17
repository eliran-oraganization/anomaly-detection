import { IDetector } from "./detector.interface";


const START_HOUR = 14 * 60 + 0; 
const END_HOUR = 16 * 60 + 0;

class IsBetweenHours<T> implements IDetector {
    detect(eventTimeInUnix: number): boolean {
        const pushTimestampInMilliseconds = new Date(eventTimeInUnix * 1000); // convert unix to milliseconds: https://stackoverflow.com/questions/6430126/convert-unix-timestamp-to-milliseconds
        var time = pushTimestampInMilliseconds.getHours() * 60 + pushTimestampInMilliseconds.getMinutes();
        return time >= START_HOUR && time < END_HOUR;
    }

}

export default IsBetweenHours;