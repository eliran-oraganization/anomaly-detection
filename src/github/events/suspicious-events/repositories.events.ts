import WithinXMinutes from "../../../detectors/within-x-minutes";
import { RepositoryPayload } from "../../actions.interface";
import SuspiciousEvents from "../events";

class RepositorySuspiciousEvents extends SuspiciousEvents<RepositoryPayload> {

    constructor() {
        super();
        this.detectors.push(
            new WithinXMinutes()
        )
    }
    onEvent(event: RepositoryPayload): void {
        if (event.action !== 'deleted') return;
        this.onEvent(event);
    }
}

export default RepositorySuspiciousEvents;