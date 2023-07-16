import RepositoryCreationBehaviorDetector from "../../../behavior/suspicious/repository-creation-behavior-detector";
import { RepositoryPayload } from "../../actions.interface";
import Events from "../events";

class RepositorySuspiciousEvents extends Events<RepositoryPayload> {

    constructor() {
        super();
        this.behaviorDetectors.push(
            new RepositoryCreationBehaviorDetector()
        )
    }
}

export default RepositorySuspiciousEvents;