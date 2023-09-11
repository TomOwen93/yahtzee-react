import { DiceCounts } from "../types";

export const checkXStraight = (
    diceCount: DiceCounts,
    straightLength: number
) => {
    let xStraightScore = 0;

    const diceValues = Object.values(diceCount);
    const straightArray: DiceCounts[] = [];

    for (let i = 0; i < diceValues.length - 1; i++) {
        if (straightArray.length === straightLength - 1) {
            break;
        }

        for (let j = i; j < diceValues.length - 1; j++) {
            const currentNumber = diceValues[j];
            const nextNumber = diceValues[j + 1];

            if (
                nextNumber.value === currentNumber.value + 1 &&
                nextNumber.count > 0 &&
                currentNumber.count > 0 &&
                !straightArray.includes(currentNumber)
            ) {
                straightArray.push(currentNumber);
            } else {
                break;
            }
        }
    }

    if (straightArray.length === straightLength - 1) {
        if (straightLength === 4) {
            xStraightScore = 30;
        } else {
            xStraightScore = 40;
        }
    }

    return xStraightScore;
};
