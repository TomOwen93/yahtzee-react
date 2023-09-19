import { DiceCounts } from "../types";

export const checkFullHouse = (diceCount: DiceCounts) => {
    let fullHouseScore = 0;
    let matchingTwo = null;
    let matchingThree = null;

    for (const objValue of Object.values(diceCount)) {
        const { count } = objValue;

        if (count === 3) {
            matchingThree = objValue;
        } else if (count === 2) {
            matchingTwo = objValue;
        }
    }

    if (matchingThree !== null && matchingTwo !== null) {
        fullHouseScore = 25;
    }

    return fullHouseScore;
};
