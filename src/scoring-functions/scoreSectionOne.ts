import { Dice } from "../types";

export const scoreSectionOne = (diceToScore: Dice[]) => {
    const newDiceRollScore = {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
    };

    for (const dice of diceToScore) {
        if (dice.roll !== null) {
            switch (dice.roll) {
                case 1:
                    newDiceRollScore.ones++;
                    break;
                case 2:
                    newDiceRollScore.twos += 2;
                    break;
                case 3:
                    newDiceRollScore.threes += 3;
                    break;
                case 4:
                    newDiceRollScore.fours += 4;
                    break;
                case 5:
                    newDiceRollScore.fives += 5;
                    break;
                case 6:
                    newDiceRollScore.sixes += 6;
                    break;
            }
        }
    }
    return newDiceRollScore;
};
