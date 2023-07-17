import { PushPayload } from "../github/actions.interface";
import IsBetweenHours from "./is-push-between-hours";




describe('Push Events', () => {

    describe('Push rules', () => {
        const detector = new IsBetweenHours();

        it('Push should be detect as anomaly when created between 14:00 - 16:00', () => {
            const situations: PushPayload[] = [
                { repository: { pushed_at: new Date('01/01/2023 15:00').getTime() / 1000 } },
                { repository: { pushed_at: new Date('01/01/2023 14:01').getTime() / 1000 } },
                { repository: { pushed_at: new Date('01/01/2023 15:59').getTime() / 1000 } }
            ]
            situations.forEach(situation => expect(detector.detect(situation)).toBe(true));
        });
        it('Push should not be detect as anomaly if it was created before 14:00 or after 16:00', () => {
            const situations: PushPayload[] = [
                { repository: { pushed_at: new Date('01/01/2023 13:59').getTime() / 1000 } },
                { repository: { pushed_at: new Date('01/01/2023 13:00').getTime() / 1000 } },
                { repository: { pushed_at: new Date('01/01/2023 16:01').getTime() / 1000 } }
            ]
            situations.forEach(situation => expect(detector.detect(situation)).toBe(false));

        });

    })

})