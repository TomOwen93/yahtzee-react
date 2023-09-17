import {
    Heading,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Tr,
} from "@chakra-ui/react";
import { Action, LeaderboardList } from "../types";

interface LeaderboardProps {
    leaderboard: LeaderboardList[];
    dispatch: React.Dispatch<Action>;
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps): JSX.Element => {
    const ranksColors = {
        1: "gold",
        2: "silver",
        3: "orange",
    };

    return (
        <>
            {" "}
            <Heading textAlign={"center"}>Current Leaderboard:</Heading>
            <TableContainer>
                <Table size={"sm"} margin={"auto"}>
                    <Tr>
                        <Th
                            whiteSpace={"normal"}
                            textAlign={"center"}
                            paddingInline={{ base: "0.5rem", lg: "0.5rem" }}
                        >
                            Rank
                        </Th>
                        <Th
                            whiteSpace={"normal"}
                            textAlign={"center"}
                            paddingInline={{ base: "0.5rem", lg: "0.5rem" }}
                        >
                            Username
                        </Th>
                        <Th
                            whiteSpace={"normal"}
                            textAlign={"center"}
                            paddingInline={{ base: "0.5rem", lg: "0.5rem" }}
                        >
                            Score Section 1
                        </Th>
                        <Th
                            whiteSpace={"normal"}
                            textAlign={"center"}
                            paddingInline={{ base: "0.5rem", lg: "0.5rem" }}
                        >
                            Score Section 2
                        </Th>
                        <Th
                            whiteSpace={"normal"}
                            textAlign={"center"}
                            paddingInline={{ base: "0.5rem", lg: "0.5rem" }}
                        >
                            Total Score
                        </Th>
                    </Tr>
                    <Tbody>
                        {leaderboard.map((rank, index) => (
                            <Tr key={index}>
                                <Td
                                    textAlign={"center"}
                                    color={
                                        ranksColors[
                                            (index +
                                                1) as keyof typeof ranksColors
                                        ]
                                    }
                                >
                                    {index + 1}
                                </Td>
                                <Td textAlign={"center"}>{rank.username}</Td>
                                <Td textAlign={"center"}>
                                    <Tag
                                        fontSize={"0.8rem"}
                                        size={"md"}
                                        colorScheme="green"
                                    >
                                        {rank.score_section_1}{" "}
                                    </Tag>
                                </Td>
                                <Td textAlign={"center"}>
                                    <Tag
                                        fontSize={"0.8rem"}
                                        size={"md"}
                                        colorScheme="pink"
                                    >
                                        {rank.score_section_2}{" "}
                                    </Tag>
                                </Td>
                                <Td textAlign={"center"}>
                                    <Tag
                                        fontSize={"0.8rem"}
                                        size={"md"}
                                        colorScheme="orange"
                                    >
                                        {rank.score_section_1 +
                                            rank.score_section_2}{" "}
                                    </Tag>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
