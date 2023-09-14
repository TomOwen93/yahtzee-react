import { DiceCounts, PotentialSectionTwoScoring } from "../types";
import { checkFullHouse } from "./checkFullHouse";
import { checkXOfAKind } from "./checkXOfAKind";

import { checkYahtzee } from "./checkYahtzee";
import { addAdditionalScores } from "./addAdditionalScores";
import { checkXStraight } from "./checkXStraight";

export const scoreSectionTwo = (
    diceCounts: DiceCounts,
    previousYahtzee: boolean
): PotentialSectionTwoScoring => {
    const sectionTwoScoring: PotentialSectionTwoScoring = {
        threeOfAKind: 0,
        fourOfAKind: 0,
        fullHouse: 0,
        smallStraight: 0,
        largeStraight: 0,
        yahtzee: 0,
        chance: 0,
    };

    sectionTwoScoring.threeOfAKind = checkXOfAKind(diceCounts, 3);
    sectionTwoScoring.fourOfAKind = checkXOfAKind(diceCounts, 4);
    sectionTwoScoring.fullHouse = checkFullHouse(diceCounts);
    sectionTwoScoring.yahtzee = checkYahtzee(diceCounts, previousYahtzee);
    sectionTwoScoring.smallStraight = checkXStraight(diceCounts, 4);
    sectionTwoScoring.largeStraight = checkXStraight(diceCounts, 5);
    sectionTwoScoring.chance = addAdditionalScores(diceCounts);

    return sectionTwoScoring;
};
