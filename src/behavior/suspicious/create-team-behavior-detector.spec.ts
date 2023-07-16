import { CreateTeamPayload } from "../../github/actions.interface";
import CreateTeamBehaviorDetector from "./create-team-behavior-detector";




describe('Teams events', () => {

    const detector = new CreateTeamBehaviorDetector()
    it('Should detect anomaly when hacker prefix inside a string', () => {
        const situations: CreateTeamPayload[] = [
            { action: 'created', team: { name: 'abcHackerdefg' } },
            { action: 'created', team: { name: 'hackerdefg' } },
            { action: 'created', team: { name: 'abcdhacker' } }
        ]
        situations.forEach(situation => expect(detector.detectBehavior(situation)).toBe(true))
    })

    it('Should not detect anomaly when no hacker prefix inside a string', () => {

        const situations: CreateTeamPayload[] = [
            { action: 'created', team: { name: 'abcHackedefg' } },
            { action: 'created', team: { name: 'abchakerdefg' } },
            { action: 'created', team: { name: 'ackerdefg' } },
            { action: 'created', team: { name: 'abcdhackr' } }
        ]
        situations.forEach(situation => expect(detector.detectBehavior(situation)).toBe(false));
    })
})