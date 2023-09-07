import { Card, Container, Heading } from "@chakra-ui/react";
import "./App.css";
import GameSection from "./GameSection";

function App(): JSX.Element {
    return (
        <>
            <Container>
                <Card>
                    <Heading textAlign={"center"}>Lets Play Yahtzee!</Heading>
                </Card>

                <GameSection />
            </Container>
        </>
    );
}

export default App;
