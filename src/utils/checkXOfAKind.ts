import { DiceCounts } from "../types";
import { addAdditionalScores } from "./addAdditionalScores";

export const checkXOfAKind = (diceCount: DiceCounts, countToCheck: number) => {
    let XOfAKindScore = 0;
    let highestXOfAKind = { key: "zero", value: 0 };
    const copyOfDiceCount = { ...diceCount };

    let xOfAKind = false;

    for (const [key, objValue] of Object.entries(diceCount)) {
        const { value, count } = objValue;

        if (count === countToCheck && value > highestXOfAKind.value) {
            XOfAKindScore = Number(value) * 3;
            highestXOfAKind = { key: key, value: objValue };

            xOfAKind = true;
        }
    }

    if (xOfAKind) {
        delete copyOfDiceCount[highestXOfAKind.key as keyof DiceCounts];
        XOfAKindScore += addAdditionalScores(copyOfDiceCount);
    }

    return XOfAKindScore;
};
