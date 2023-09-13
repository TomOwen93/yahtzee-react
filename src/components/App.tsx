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
            <Flex justifyContent="space-between" w={"100vw"}>
                <Button
                    marginTop="0.5rem"
                    marginLeft={"0.5rem"}
                    onClick={toggleColorMode}
                >
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>

                <Heading marginLeft={"15rem"} fontSize={"2.5rem"}>
                    Lets Play Yahtzee!
                </Heading>

                <Flex>
                    <Popover>
                        <PopoverTrigger>
                            <Button marginRight="0.5rem">Rules</Button>
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
                            <Button marginRight="10rem">
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
