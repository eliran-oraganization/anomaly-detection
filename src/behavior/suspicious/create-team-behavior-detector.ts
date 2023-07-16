import { CreateTeamPayload } from "../../github/actions.interface";
import ConsoleNotifier from "../../notifier/console.notifier";
import BaseBehaviorDetector from "../base-behavior-detector";


const PREFIX = 'hacker';
class CreateTeamBehaviorDetector extends BaseBehaviorDetector<CreateTeamPayload> {
    detectBehavior(payload: CreateTeamPayload): boolean {
        if (this.isCreatingHackerTeam(payload)) {
            this.notifyUser('Suspicious behavior: creating a team with the prefix "hacker"', new ConsoleNotifier());
            return true;
        }
        return false;
    }

    private isCreatingHackerTeam(payload: CreateTeamPayload): boolean {
        const teamName = payload.team.name.toLowerCase();
        return teamName.toLowerCase().includes(PREFIX);
    }
}

export default CreateTeamBehaviorDetector;