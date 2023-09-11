import {
    Button,
    Card,
    Container,
    Heading,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import "./App.css";
import GameSection from "./GameSection";

function App(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <VStack>
                <header>
                    <Button onClick={toggleColorMode}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </Button>
                </header>

                <Container maxW="50rem">
                    <Card>
                        <Heading textAlign={"center"}>
                            Lets Play Yahtzee!
                        </Heading>
                    </Card>

                    <GameSection />
                </Container>
            </VStack>
        </>
    );
}

export default App;
