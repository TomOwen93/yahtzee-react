import {
    Button,
    Card,
    Container,
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
import GameSection from "./GameSection";
import { GeneralRules } from "./GeneralRules";
import { CategoryRules } from "./CategoryRules";

function App(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Button
                marginTop="0.5rem"
                marginLeft={"0.5rem"}
                onClick={toggleColorMode}
            >
                Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>

            <Flex justifyContent={"flex-end"}>
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
                        <Button marginRight="10rem">Scoring Categories</Button>
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

            <Container maxW="50rem">
                <Card marginBottom={"2rem"}>
                    <Heading fontSize={"3rem"} textAlign={"center"}>
                        Lets Play Yahtzee!
                    </Heading>
                </Card>

                <GameSection />
            </Container>
        </>
    );
}

export default App;
