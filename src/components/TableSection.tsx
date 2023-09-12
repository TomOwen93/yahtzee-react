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
    playersScores: PotentialFullScoring;
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
    playersScores,
    sectionLookUp,
    dispatch,
    potentialScores,
    gameState,
    handleToast,
    totalScore,
}: TableSectionProps): JSX.Element {
    return (
        <>
            <TableContainer>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>{`Section ${section}`}</Th>
                            <Th>Game 1</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {Object.keys(sectionLookUp).map((row, index) => (
                            <Tr key={index}>
                                <Td>
                                    {
                                        sectionLookUp[
                                            row as keyof CombinedSectionLookup
                                        ]
                                    }
                                </Td>
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
                                            color="orange"
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
                                            {
                                                <Text as={"u"}>
                                                    {
                                                        potentialScores[
                                                            row as keyof PotentialFullScoring
                                                        ]
                                                    }
                                                </Text>
                                            }
                                        </Td>
                                    )
                                )}
                            </Tr>
                        ))}

                        <Tr>
                            <Td fontWeight="bold">Total Points:</Td>
                            <Td>
                                <Tag
                                    fontSize={"1rem"}
                                    size={"md"}
                                    colorScheme="yellow"
                                >
                                    {totalScore}
                                </Tag>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="bold">Bonus Points:</Td>
                        </Tr>
                        <Tr>
                            <Td fontWeight="bold">Total Section {section}:</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
