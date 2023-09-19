import {
    Heading,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useMediaQuery,
    useToast,
} from "@chakra-ui/react";
import { Action, LeaderboardList } from "../types";
import moment from "moment";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { baseUrl } from "../utils/baseUrl";

interface LeaderboardProps {
    leaderboard: LeaderboardList[];
    dispatch: React.Dispatch<Action>;
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps): JSX.Element => {
    const toast = useToast();
    const ranksColors = {
        1: "gold",
        2: "silver",
        3: "orange",
    };

    const leaderboardCopy = [...leaderboard];

    const sortedLeaderboard = leaderboardCopy.sort(
        (a, b) =>
            b.score_section_1 +
            b.score_section_2 -
            (a.score_section_1 + a.score_section_2)
    );

    const [isLargerThanlg] = useMediaQuery("(min-width: 992px)");

    useEffect(() => {
        const newSocket = io(baseUrl);
        newSocket.connect();
        newSocket.on(
            "new-score",
            (payload: { data: LeaderboardList; name: string }) => {
                toast({
                    title: "New Score Registered!",
                    description: `Username: ${
                        payload.name
                    } \n has submitted a score of ${
                        payload.data.score_section_1 +
                        payload.data.score_section_2
                    }!`,
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
            }
        );

        function cleanup() {
            newSocket.disconnect();
        }

        return cleanup;
    }, [toast]);

    return (
        <>
            {" "}
            <Heading textAlign={"center"}>Current Leaderboard:</Heading>
            <TableContainer>
                <Table
                    className={isLargerThanlg ? "" : "table-tiny"}
                    size={{ base: "sm", lg: "lg" }}
                    margin={"auto"}
                >
                    <Thead>
                        <Tr>
                            <Th whiteSpace={"normal"} textAlign={"center"}>
                                Rank
                            </Th>
                            <Th whiteSpace={"normal"} textAlign={"center"}>
                                Username
                            </Th>
                            <Th
                                whiteSpace={"normal"}
                                textAlign={"center"}
                                paddingInlineStart={0}
                            >
                                Score Section 1
                            </Th>
                            <Th whiteSpace={"normal"} textAlign={"center"}>
                                Score Section 2
                            </Th>
                            <Th whiteSpace={"normal"} textAlign={"center"}>
                                Total Score
                            </Th>
                            <Th whiteSpace={"normal"} textAlign={"center"}>
                                Submitted
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedLeaderboard.map((rank, index) => (
                            <Tr key={index}>
                                <Td
                                    textAlign={"left"}
                                    color={
                                        ranksColors[
                                            (index +
                                                1) as keyof typeof ranksColors
                                        ]
                                    }
                                >
                                    {index + 1}
                                </Td>
                                <Td textAlign={"left"}>
                                    {rank.username === ""
                                        ? `Anonymous`
                                        : rank.username}
                                </Td>
                                <Td textAlign={"left"}>
                                    <Tag
                                        fontSize={"0.8rem"}
                                        size={"md"}
                                        colorScheme="green"
                                    >
                                        {rank.score_section_1}{" "}
                                    </Tag>
                                </Td>
                                <Td textAlign={"left"}>
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
                                <Td textAlign={"center"}>
                                    <Tag
                                        fontSize={"0.8rem"}
                                        size={"md"}
                                        colorScheme="facebook"
                                    >
                                        {moment().diff(
                                            moment(rank.creation_date),
                                            "days"
                                        ) === 0
                                            ? `${moment().diff(
                                                  moment(rank.creation_date),
                                                  "hours"
                                              )} hours ago`
                                            : `${moment().diff(
                                                  moment(rank.creation_date),
                                                  "days"
                                              )} days ago`}
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
