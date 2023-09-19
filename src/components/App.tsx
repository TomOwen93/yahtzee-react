import {
    Button,
    Flex,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { LeaderboardList } from "../types";
import { baseUrl } from "../utils/baseUrl";
import "./App.css";
import { CategoryRules } from "./CategoryRules";
import GameSection from "./GameSection";
import { GeneralRules } from "./GeneralRules";

function App(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();

    useEffect(() => {
        const newSocket = io(baseUrl, { transports: ["websocket"] });
        newSocket.connect();
        newSocket.on("new-score", (data: LeaderboardList) => {
            toast({
                title: "New Score Registered!",
                description: `Username: ${
                    data.username
                } \n has submitted a score of ${
                    data.score_section_1 + data.score_section_2
                }!`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        });

        function cleanup() {
            newSocket.disconnect();
        }

        return cleanup;
    }, [toast]);

    return (
        <>
            <Flex
                w={{ base: "100%", lg: "auto" }}
                alignItems="center"
                flexDirection={{ base: "column", lg: "row" }}
                justifyContent={{ base: "center", lg: "space-between" }}
            >
                <Button
                    marginTop="0.5rem"
                    marginLeft={{ base: "auto", lg: "0.5rem" }}
                    marginRight={{ base: "auto", lg: "0.5rem" }}
                    onClick={toggleColorMode}
                    mb={{ base: 1, lg: 2 }}
                    width={{ base: "20rem", lg: "auto" }}
                >
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>

                <Heading
                    mb={{ base: 1, lg: 2 }}
                    marginLeft={{ base: "0.5rem", lg: "5%" }}
                    fontSize={{ base: "2rem", lg: "2.5rem" }}
                >
                    Yahtzee Online
                </Heading>

                <Flex
                    flexDirection={"row"}
                    gap={{ base: "0.5rem", lg: "auto" }}
                >
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                size={{ base: "sm", lg: "md" }}
                                mb={{ base: 1, lg: 2 }}
                                marginLeft={{ base: "auto" }}
                                marginRight={{ base: "auto" }}
                            >
                                Rules
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader fontSize={"2xl"}>
                                General Rules:
                            </PopoverHeader>
                            <PopoverBody whiteSpace="pre-line">
                                <GeneralRules />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <Button
                                size={{ base: "sm", lg: "md" }}
                                mb={{ base: 1, lg: 2 }}
                                marginLeft={{ base: "auto" }}
                                marginRight={{ base: "auto", lg: "1rem" }}
                            >
                                Scoring Categories
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader fontSize={"2xl"}>
                                Category Rules:
                            </PopoverHeader>
                            <PopoverBody whiteSpace="pre-line">
                                <CategoryRules />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Flex>

            <GameSection />
        </>
    );
}

export default App;
