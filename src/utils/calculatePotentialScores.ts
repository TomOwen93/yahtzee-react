import { Dice } from "../types";
import { countOnesToSixes } from "./countOnestoSixes";
import { scoreSectionOne } from "./scoreSectionOne";
import { scoreSectionTwo } from "./scoreSectionTwo";

export const calculatePotentialScores = (
    diceToScore: Dice[],
    previousYahtzee: boolean
) => {
    const currentDiceCounts = countOnesToSixes(diceToScore);
    const sectionOneScores = scoreSectionOne(diceToScore);
    const sectionTwoScores = scoreSectionTwo(
        currentDiceCounts,
        previousYahtzee
    );

    const fullPotentialScore = { ...sectionOneScores, ...sectionTwoScores };
    console.log(fullPotentialScore);
    return fullPotentialScore;
};
