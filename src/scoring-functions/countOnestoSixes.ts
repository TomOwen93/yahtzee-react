import { Dice } from "../types";

export const countOnesToSixes = (diceToScore: Dice[]) => {
    const newDiceRollCount = {
        ones: { value: 1, count: 0 },
        twos: { value: 2, count: 0 },
        threes: { value: 3, count: 0 },
        fours: { value: 4, count: 0 },
        fives: { value: 5, count: 0 },
        sixes: { value: 6, count: 0 },
    };

    for (const dice of diceToScore) {
        if (dice.roll !== null) {
            switch (dice.roll) {
                case 1:
                    newDiceRollCount.ones.count++;
                    break;
                case 2:
                    newDiceRollCount.twos.count++;
                    break;
                case 3:
                    newDiceRollCount.threes.count++;
                    break;
                case 4:
                    newDiceRollCount.fours.count++;
                    break;
                case 5:
                    newDiceRollCount.fives.count++;
                    break;
                case 6:
                    newDiceRollCount.sixes.count++;
                    break;
            }
        }
    }
    return newDiceRollCount;
};
