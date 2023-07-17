import { RepositoryPayload } from "../github/actions.interface";
import { IDetector } from "./detector.interface";


class WithinXMinutes implements IDetector<RepositoryPayload> {

  detect(payload: RepositoryPayload): boolean {
    if (payload.action !== 'deleted') return false;
    const creationTime = new Date(payload.repository.created_at);
    const deletionTime = new Date(payload.repository.updated_at);
    const timeDifference = deletionTime.getTime() - creationTime.getTime();
    return timeDifference < 10 * 60 * 1000;
  }

}

export default WithinXMinutes;