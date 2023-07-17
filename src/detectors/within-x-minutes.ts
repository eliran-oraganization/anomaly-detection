import { IDetector } from "./detector.interface";

export interface WithinXMinutesPayload {
  startDate: string;
  endDate: string;
}

class WithinXMinutes implements IDetector {

  detect<WithinXMinutesPayload>(payload: WithinXMinutesPayload): boolean {
    const creationTime = new Date(payload.startDate);
    const deletionTime = new Date(payload.endDate);
    const timeDifference = deletionTime.getTime() - creationTime.getTime();
    return timeDifference < 10 * 60 * 1000;
  }

}

export default WithinXMinutes;