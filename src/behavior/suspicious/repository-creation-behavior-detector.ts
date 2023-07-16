import BaseBehaviorDetector from "../base-behavior-detector";
import { RepositoryPayload } from "../../github/actions.interface";
import ConsoleNotifier from "../../notifier/console.notifier";

class RepositoryCreationBehaviorDetector extends BaseBehaviorDetector<RepositoryPayload> {
  detectBehavior(payload: RepositoryPayload): boolean {
    if (this.isCreatingAndDeletingRepository(payload)) {
      this.notifyUser('Suspicious behavior: creating and deleting a repository within 10 minutes', new ConsoleNotifier());
      return true;
    }
    return false;
  }

  private isCreatingAndDeletingRepository(payload: RepositoryPayload): boolean {
    if (payload.action !== 'deleted') return false;

    const creationTime = new Date(payload.repository.created_at);
    const deletionTime = new Date(payload.repository.updated_at);
    const timeDifference = deletionTime.getTime() - creationTime.getTime();
    return timeDifference < 10 * 60 * 1000;
  }
}

export default RepositoryCreationBehaviorDetector;