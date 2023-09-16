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
            <TableContainer whiteSpace={"normal"}>
                <Table size={"sm"}>
                    <Thead>
                        <Tr>
                            <Th
                                fontSize={{ base: "0.7rem", lg: "1rem" }}
                                textAlign={"center"}
                            >{`Section ${section}`}</Th>
                            <Th
                                fontSize={{ base: "0.7rem", lg: "1rem" }}
                                textAlign={"center"}
                            >{`Score`}</Th>
                        </Tr>
                    </Thead>

                    <Tbody textAlign={"center"}>
                        {Object.keys(sectionLookUp).map((row, index) => (
                            <Tr key={index}>
                                <Td
                                    fontSize={{ base: "0.7rem", lg: "1rem" }}
                                    textAlign={"center"}
                                >
                                    {
                                        sectionLookUp[
                                            row as keyof CombinedSectionLookup
                                        ]
                                    }
                                </Td>

                                {currentRoundScores[
                                    row as keyof PotentialFullScoring
                                ] !== null ? (
                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
                                        textAlign={"center"}
                                    >
                                        {
                                            currentRoundScores[
                                                row as keyof PotentialFullScoring
                                            ]
                                        }
                                    </Td>
                                ) : gameState.rollsLeft === 3 ? (
                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
                                        textAlign={"center"}
                                    ></Td>
                                ) : (
                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
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
                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
                                        textAlign={"center"}
                                        fontWeight="bold"
                                    >
                                        Total Points:
                                    </Td>
                                    <Td textAlign={"center"}>
                                        <Tag
                                            fontSize={"0.75rem"}
                                            size={"md"}
                                            colorScheme="yellow"
                                        >
                                            {totalScore}
                                        </Tag>
                                    </Td>
                                </>
                            ) : (
                                <>
                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
                                        fontWeight="bold"
                                        textAlign={"center"}
                                    >
                                        Total Points Section 2:
                                    </Td>

                                    <Td
                                        fontSize={{
                                            base: "0.7rem",
                                            lg: "1rem",
                                        }}
                                        textAlign={"center"}
                                    >
                                        <Tag
                                            fontSize={"0.75rem"}
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
                                <Td
                                    fontSize={{ base: "0.7rem", lg: "1rem" }}
                                    fontWeight="bold"
                                    textAlign={"center"}
                                >
                                    Bonus Points:{" "}
                                </Td>
                                <Td
                                    fontSize={{ base: "0.7rem", lg: "1rem" }}
                                    fontWeight="bold"
                                    textAlign={"center"}
                                >
                                    <Tag
                                        fontSize={"0.75rem"}
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
                                <Td
                                    fontSize={{ base: "0.7rem", lg: "1rem" }}
                                    fontWeight="bold"
                                    textAlign={"center"}
                                >
                                    Total Section {section}:
                                </Td>

                                <Td
                                    fontSize={{ base: "0.7rem", lg: "1rem" }}
                                    fontWeight="bold"
                                    textAlign={"center"}
                                >
                                    <Tag
                                        fontSize={"0.75rem"}
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
