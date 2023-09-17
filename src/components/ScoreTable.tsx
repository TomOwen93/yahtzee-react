import {
    Center,
    Divider,
    Flex,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
    useToast,
} from "@chakra-ui/react";
import {
    Action,
    GameState,
    PotentialFullScoring,
    PotentialSectionOneScoring,
    PotentialSectionTwoScoring,
} from "../types";

import { calculateTotals } from "../utils/calculateTotals";
import TableSection from "./TableSection";

interface ScoreTableProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    potentialScores: PotentialFullScoring;
    sectionOneScores: PotentialSectionOneScoring;
    sectionTwoScores: PotentialSectionTwoScoring;
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
            position: "bottom-right",
        });

    const currentTotalSection1 = calculateTotals(1, playersScores);
    const currentTotalSection2 = calculateTotals(2, playersScores);

    if (currentTotalSection1 >= 63) {
        dispatch({ type: "bonus-points" });
    }

    return (
        <>
            <VStack>
                <Flex>
                    <TableSection
                        section={1}
                        currentRoundScores={playersScores}
                        sectionLookUp={sectionOneLookUps}
                        dispatch={dispatch}
                        gameState={gameState}
                        potentialScores={potentialScores}
                        handleToast={handleToast}
                        totalScore={currentTotalSection1}
                    />
                    <Center height="21.5rem">
                        <Divider orientation="vertical" />
                    </Center>
                    <TableSection
                        section={2}
                        currentRoundScores={playersScores}
                        sectionLookUp={sectionTwoLookUps}
                        dispatch={dispatch}
                        gameState={gameState}
                        potentialScores={potentialScores}
                        handleToast={handleToast}
                        totalScore={currentTotalSection2}
                    />
                </Flex>

                <TableContainer>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th textAlign={"center"}>Combined Score</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td textAlign={"center"}>
                                    <Tag
                                        fontSize={{
                                            base: "0.75rem",
                                            lg: "1rem",
                                        }}
                                        size={"md"}
                                        colorScheme="yellow"
                                        textAlign={"center"}
                                    >
                                        {currentTotalSection1 +
                                            currentTotalSection2 +
                                            gameState.Player1.bonusPoints}
                                    </Tag>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </>
    );
}
