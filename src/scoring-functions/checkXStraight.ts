import { DiceCounts } from "../types";

export const checkXStraight = (
    diceCount: DiceCounts,
    straightLength: number
) => {
    let xStraightScore = 0;

    const diceFiltered = Object.values(diceCount).filter(
        (dice) => dice.count > 0
    );
    const diceValues = diceFiltered.map((dice) => dice.value);
    diceValues.sort((a, b) => a - b);

    let consecutiveCount = 1;

    for (let i = 0; i < diceValues.length - 1; i++) {
        if (diceValues[i + 1] === diceValues[i] + 1) {
            consecutiveCount++;
        } else if (diceValues[i + 1] !== diceValues[i]) {
            consecutiveCount = 1;
        }

        if (consecutiveCount === straightLength) {
            if (straightLength === 4) {
                xStraightScore = 30;
            } else if (straightLength === 5) {
                xStraightScore = 40;
            }
            break;
        }
    }

    if (consecutiveCount < straightLength) {
        xStraightScore = 0;
    }

    return xStraightScore;
};
