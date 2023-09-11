import { useToast } from "@chakra-ui/react";
import { GameState, PotentialFullScoring } from "../types";
import { Action } from "./GameSection";

import TableSection from "./TableSection";

interface ScoreTableProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    potentialScores: PotentialFullScoring;
}

const sectionOneLookUps = {
    ones: "Ones ⚀",
    twos: "Twos ⚁",
    threes: "Threes ⚂",
    fours: "Fours ⚃",
    fives: "Fives ⚄",
    sixes: "Sixes ⚅",
};
const sectionTwoLookUps = {
    threeOfAKind: "Three of a Kind",
    fourOfAKind: "Four of a Kind",
    fullHouse: "Full House",
    smallStraight: "Small Straight",
    largeStraight: "Large Straight",
    yahtzee: "Yahtzee",
    chance: "Chance",
};

type SectionOneLookUpType = typeof sectionOneLookUps;
type SectionTwoLookUpType = typeof sectionTwoLookUps;

export type CombinedSectionLookup = SectionOneLookUpType | SectionTwoLookUpType;

export default function ScoreTable({
    gameState,
    dispatch,
    potentialScores,
}: ScoreTableProps): JSX.Element {
    const playersScores = gameState.Player1.scoringChecks;

    const toast = useToast();

    const handleToast = (
        title: string,
        description: string,
        status:
            | "info"
            | "warning"
            | "success"
            | "error"
            | "loading"
            | undefined,
        duration: number
    ) =>
        toast({
            title,
            description,
            status,
            duration,
            isClosable: true,
        });

    return (
        <>
            <TableSection
                section={1}
                playersScores={playersScores}
                sectionLookUp={sectionOneLookUps}
                dispatch={dispatch}
                gameState={gameState}
                potentialScores={potentialScores}
                handleToast={handleToast}
            />
            <TableSection
                section={2}
                playersScores={playersScores}
                sectionLookUp={sectionTwoLookUps}
                dispatch={dispatch}
                gameState={gameState}
                potentialScores={potentialScores}
                handleToast={handleToast}
            />
        </>
    );
}
