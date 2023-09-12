import {
    Dice,
    PotentialFullScoring,
    PotentialSectionOneScoring,
    PotentialSectionTwoScoring,
} from "../types";
import { countOnesToSixes } from "./countOnestoSixes";
import { scoreSectionOne } from "./scoreSectionOne";
import { scoreSectionTwo } from "./scoreSectionTwo";

export const calculatePotentialScores = (
    diceToScore: Dice[],
    previousYahtzee: boolean
): [
    PotentialFullScoring,
    PotentialSectionOneScoring,
    PotentialSectionTwoScoring
] => {
    const currentDiceCounts = countOnesToSixes(diceToScore);
    const sectionOneScores = scoreSectionOne(diceToScore);
    const sectionTwoScores = scoreSectionTwo(
        currentDiceCounts,
        previousYahtzee
    );

    const potentialScores = { ...sectionOneScores, ...sectionTwoScores };
    return [potentialScores, sectionOneScores, sectionTwoScores];
};
