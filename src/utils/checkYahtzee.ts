import { DiceCounts } from "../types";

export const checkYahtzee = (
    diceCount: DiceCounts,
    previousYahtzee: boolean
) => {
    let yahtzeeScore = 0;

    for (const objValue of Object.values(diceCount)) {
        const { count } = objValue;

        if (count === 5) {
            if (previousYahtzee) {
                yahtzeeScore = 100;
            }
            yahtzeeScore = 50;
        }
    }

    return yahtzeeScore;
};
