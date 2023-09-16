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
} from "@chakra-ui/react";
import "./App.css";
import { CategoryRules } from "./CategoryRules";
import GameSection from "./GameSection";
import { GeneralRules } from "./GeneralRules";

function App(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Flex
                justifyContent={{ base: "center", lg: "space-between" }}
                w={"100vw"}
                flexDirection={{ base: "column", lg: "row" }}
            >
                <Button
                    marginTop="0.5rem"
                    marginLeft={{ base: "auto", lg: "0.5rem" }}
                    marginRight={{ base: "auto", lg: "" }}
                    onClick={toggleColorMode}
                    mb={{ base: 1, lg: 2 }}
                    width={{ base: "20rem", lg: "auto" }}
                >
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>

                <Heading
                    mb={{ base: 1, lg: 2 }}
                    marginLeft={{ base: "auto", lg: "15rem" }}
                    marginRight={{ base: "auto", lg: "" }}
                    fontSize={{ base: "2rem", lg: "2.5rem" }}
                >
                    Let's Play Yahtzee!
                </Heading>

                <Flex align={{ base: "center" }} margin={"auto"}>
                    <Popover>
                        <PopoverTrigger>
                            <Button mb={{ base: 1, lg: 2 }}>Rules</Button>
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
                                mb={{ base: 1, lg: 2 }}
                                marginLeft={{ base: "auto", lg: "0.5rem" }}
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
