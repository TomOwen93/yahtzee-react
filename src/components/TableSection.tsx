import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Tag,
} from "@chakra-ui/react";
import { Action, GameState, PotentialFullScoring } from "../types";
import { CombinedSectionLookup } from "./ScoreTable";

export interface TableSectionProps {
    section: number;
    currentRoundScores: PotentialFullScoring;
    sectionLookUp: CombinedSectionLookup;
    dispatch: React.Dispatch<Action>;
    potentialScores: PotentialFullScoring;
    gameState: GameState;
    totalScore: number;
    handleToast: (
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
    ) => void;
}

export default function TableSection({
    section,
    currentRoundScores,
    sectionLookUp,
    dispatch,
    potentialScores,
    gameState,
    handleToast,
    totalScore,
}: TableSectionProps): JSX.Element {
    const bonusPoints = gameState.Player1.bonusPoints;

    return (
        <>
            <TableContainer>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th textAlign={"center"}>{`Section ${section}`}</Th>
                            <Th textAlign={"center"}>{`Score`}</Th>
                        </Tr>
                    </Thead>

                    <Tbody textAlign={"center"}>
                        {Object.keys(sectionLookUp).map((row, index) => (
                            <Tr key={index}>
                                <Td textAlign={"center"}>
                                    {
                                        sectionLookUp[
                                            row as keyof CombinedSectionLookup
                                        ]
                                    }
                                </Td>

                                {currentRoundScores[
                                    row as keyof PotentialFullScoring
                                ] !== null ? (
                                    <Td textAlign={"center"}>
                                        {
                                            currentRoundScores[
                                                row as keyof PotentialFullScoring
                                            ]
                                        }
                                    </Td>
                                ) : gameState.rollsLeft === 3 ? (
                                    <Td textAlign={"center"}></Td>
                                ) : (
                                    <Td
                                        textAlign={"center"}
                                        color="orange"
                                        cursor={"pointer"}
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
                                                2000
                                            );
                                        }}
                                    >
                                        {
                                            <Text>
                                                {
                                                    potentialScores[
                                                        row as keyof PotentialFullScoring
                                                    ]
                                                }
                                            </Text>
                                        }
                                    </Td>
                                )}
                            </Tr>
                        ))}

                        <Tr>
                            {section === 1 ? (
                                <>
                                    <Td textAlign={"center"} fontWeight="bold">
                                        Total Points:
                                    </Td>
                                    <Td textAlign={"center"}>
                                        <Tag
                                            fontSize={"1rem"}
                                            size={"md"}
                                            colorScheme="yellow"
                                        >
                                            {totalScore}
                                        </Tag>
                                    </Td>
                                </>
                            ) : (
                                <>
                                    <Td fontWeight="bold" textAlign={"center"}>
                                        Total Points Section 2:
                                    </Td>

                                    <Td textAlign={"center"}>
                                        <Tag
                                            fontSize={"1rem"}
                                            size={"md"}
                                            colorScheme="green"
                                        >
                                            {totalScore}
                                        </Tag>
                                    </Td>
                                </>
                            )}
                        </Tr>
                        {section === 1 && (
                            <Tr>
                                <Td fontWeight="bold" textAlign={"center"}>
                                    Bonus Points:{" "}
                                </Td>
                                <Td fontWeight="bold" textAlign={"center"}>
                                    <Tag
                                        fontSize={"1rem"}
                                        size={"md"}
                                        colorScheme="yellow"
                                    >
                                        {" "}
                                        {bonusPoints}
                                    </Tag>
                                </Td>
                            </Tr>
                        )}
                        {section === 1 && (
                            <Tr>
                                <Td fontWeight="bold" textAlign={"center"}>
                                    Total Section {section}:
                                </Td>

                                <Td fontWeight="bold" textAlign={"center"}>
                                    <Tag
                                        fontSize={"1rem"}
                                        size={"md"}
                                        colorScheme="green"
                                    >
                                        {totalScore + bonusPoints}
                                    </Tag>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
