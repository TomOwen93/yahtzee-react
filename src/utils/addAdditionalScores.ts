import { DiceCounts } from "../types";

export const addAdditionalScores = (remainingDice: DiceCounts) => {
    let remainingDiceScore = 0;

    for (const objValue of Object.values(remainingDice)) {
        const { value, count } = objValue;

        remainingDiceScore += count * value;
    }

    return remainingDiceScore;
};
