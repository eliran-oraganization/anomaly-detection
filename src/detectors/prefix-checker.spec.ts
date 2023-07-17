import { CreateTeamPayload } from "../github/actions.interface";
import PrefixChecker from "./prefix-checker";




describe('Teams events', () => {

    const detector = new PrefixChecker()
    it('Should detect anomaly when hacker prefix inside a string', () => {
        const situations: CreateTeamPayload[] = [
            { action: 'created', team: { name: 'abcHackerdefg' } },
            { action: 'created', team: { name: 'hackerdefg' } },
            { action: 'created', team: { name: 'abcdhacker' } }
        ]
        situations.forEach(situation => expect(detector.detect(situation.team.name)).toBe(true))
    })

    it('Should not detect anomaly when no hacker prefix inside a string', () => {

        const situations: CreateTeamPayload[] = [
            { action: 'created', team: { name: 'abcHackedefg' } },
            { action: 'created', team: { name: 'abchakerdefg' } },
            { action: 'created', team: { name: 'ackerdefg' } },
            { action: 'created', team: { name: 'abcdhackr' } }
        ]
        situations.forEach(situation => expect(detector.detect(situation.team.name)).toBe(false));
    })
})