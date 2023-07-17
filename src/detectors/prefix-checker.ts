import { CreateTeamPayload } from "../github/actions.interface";
import { IDetector } from "./detector.interface";


const PREFIX = 'hacker';
class PrefixChecker implements IDetector<CreateTeamPayload> {

    detect(payload: CreateTeamPayload): boolean {
        return payload.team.name.toLowerCase().includes(PREFIX);
    }
}

export default PrefixChecker;