import {
    PotentialSectionOneScoring,
    PotentialSectionTwoScoring,
} from "../types";

export const calculateTotals = (
    section: number,
    currentScoring: PotentialSectionOneScoring | PotentialSectionTwoScoring
) => {
    let totalSectionScore = 0;

    const ScoreChecks =
        section === 1
            ? ["ones", "twos", "threes", "fours", "fives", "sixes"]
            : [
                  "chance",
                  "fourOfAKind",
                  "fullHouse",
                  "largeStraight",
                  "smallStraight",
                  "threeOfAKind",
                  "yahtzee",
              ];

    totalSectionScore = ScoreChecks.reduce(
        (prev, curr) =>
            prev + currentScoring[curr as keyof typeof currentScoring],
        0
    );

    return totalSectionScore;
};
