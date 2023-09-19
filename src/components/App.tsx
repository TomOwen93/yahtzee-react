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
