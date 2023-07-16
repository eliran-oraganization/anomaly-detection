import CreateTeamBehaviorDetector from "../../../behavior/suspicious/create-team-behavior-detector";
import { CreateTeamPayload } from "../../actions.interface";
import Events from "../events";

class TeamsSuspiciousEvents extends Events<CreateTeamPayload> {

    constructor() {
        super();
        this.behaviorDetectors.push(
            new CreateTeamBehaviorDetector()
        )
    }

}

export default TeamsSuspiciousEvents;