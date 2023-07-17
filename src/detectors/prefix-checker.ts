import { IDetector } from "./detector.interface";


const PREFIX = 'hacker';
class PrefixChecker implements IDetector<string> {

    detect(sentence: string): boolean {
        return sentence.toLowerCase().includes(PREFIX);
    }
}

export default PrefixChecker;