import {
    Divider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import { GameState, PotentialFullScoring } from "../types";
import { Action } from "./GameSection";
import { callToast } from "../utils/callToast";

interface ScoreTableProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    potentialScores: PotentialFullScoring;
}

export default function ScoreTable({
    gameState,
    dispatch,
    potentialScores,
}: ScoreTableProps): JSX.Element {
    const sectionOneScoreChecks = {
        ones: "Ones ⚀",
        twos: "Twos ⚁",
        threes: "Threes ⚂",
        fours: "Fours ⚃",
        fives: "Fives ⚄",
        sixes: "Sixes ⚅",
    };
    const sectionTwoScoreChecks = {
        threeOfAKind: "Three of a Kind",
        fourOfAKind: "Four of a Kind",
        fullHouse: "Full House",
        smallStraight: "Small Straight",
        largeStraight: "Large Straight",
        yahtzee: "Yahtzee",
        chance: "Chance",
    };

    const playersScores = gameState.Player1.scoringChecks;

    const toast = useToast();

    const handleToast = (
        title: string,
        description: string,
        status: string,
        duration: number
    ) => {
        callToast(toast, title, description, status, duration);
    };

    return (
        <>
            <TableContainer>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>Section 1</Th>
                            <Th>Game 1</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {Object.keys(sectionOneScoreChecks).map(
                            (row, index) => (
                                <Tr key={index}>
                                    <Td>{sectionOneScoreChecks[row]}</Td>
                                    {playersScores[
                                        row as keyof PotentialFullScoring
                                    ] !== null ? (
                                        <Td>
                                            {
                                                playersScores[
                                                    row as keyof PotentialFullScoring
                                                ]
                                            }
                                        </Td>
                                    ) : (
                                        potentialScores &&
                                        gameState.rollsLeft < 3 && (
                                            <Td
                                                color="tomato"
                                                cursor={"progress"}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "next-turn",
                                                    });
                                                    dispatch({
                                                        type: "lock-in-score",
                                                        payload: {
                                                            key: row,
                                                            value: potentialScores[
                                                                row as keyof PotentialFullScoring
                                                            ],
                                                        },
                                                    });
                                                    handleToast(
                                                        `Score chosen:`,
                                                        `Score category ${row} was locked in`,
                                                        `success`,
                                                        5000
                                                    );
                                                }}
                                            >
                                                {potentialScores[
                                                    row as keyof PotentialFullScoring
                                                ] === 0
                                                    ? ""
                                                    : potentialScores[
                                                          row as keyof PotentialFullScoring
                                                      ]}
                                            </Td>
                                        )
                                    )}
                                </Tr>
                            )
                        )}

                        <Tr>
                            <Td fontWeight="bold">Total Points:</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="bold">Bonus Points:</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="bold">Total Section 1:</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <Divider />
            <TableContainer>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>Section 2</Th>

                            <Th>Game 1</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.keys(sectionTwoScoreChecks).map(
                            (row, index) => (
                                <Tr key={index}>
                                    <Td>{sectionTwoScoreChecks[row]}</Td>

                                    {playersScores[
                                        row as keyof PotentialFullScoring
                                    ] !== null ? (
                                        <Td>
                                            {
                                                playersScores[
                                                    row as keyof PotentialFullScoring
                                                ]
                                            }
                                        </Td>
                                    ) : (
                                        potentialScores &&
                                        gameState.rollsLeft < 3 && (
                                            <Td
                                                color="tomato"
                                                cursor={"progress"}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "next-turn",
                                                    });
                                                    dispatch({
                                                        type: "lock-in-score",
                                                        payload: {
                                                            key: row,
                                                            value: potentialScores[
                                                                row as keyof PotentialFullScoring
                                                            ],
                                                        },
                                                    });
                                                }}
                                            >
                                                {potentialScores[
                                                    row as keyof PotentialFullScoring
                                                ] === 0
                                                    ? ""
                                                    : potentialScores[
                                                          row as keyof PotentialFullScoring
                                                      ]}
                                            </Td>
                                        )
                                    )}
                                </Tr>
                            )
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
