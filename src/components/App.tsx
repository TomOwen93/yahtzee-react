import { Card, Container, Heading, VStack } from "@chakra-ui/react";
import "./App.css";
import GameSection from "./GameSection";

function App(): JSX.Element {
    return (
        <>
            <VStack>
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
