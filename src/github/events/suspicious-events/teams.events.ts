import PrefixChecker from "../../../detectors/prefix-checker";
import { CreateTeamPayload } from "../../actions.interface";
import SuspiciousEvents from "../events";

class TeamsSuspiciousEvents extends SuspiciousEvents<CreateTeamPayload> {

    
    constructor() {
        super();
        this.detectors.push(
            new PrefixChecker()
        )
    }

}

export default TeamsSuspiciousEvents;