import {
    Button,
    Card,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tag,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";
import { Action, DiceRoll, GameState, PotentialFullScoring } from "../types";
import { calculatePotentialScores } from "../utils/calculatePotentialScores";
import { calculateTotals } from "../utils/calculateTotals";
import ScoreTable from "./ScoreTable";
import { useEffect } from "react";

export default function GameSection(): JSX.Element {
    const initialState: GameState = {
        gameTurn: 0,
        rollsLeft: 3,
        rolledDice: [
            { id: 1, roll: null },
            { id: 2, roll: null },
            { id: 3, roll: null },
            { id: 4, roll: null },
            { id: 5, roll: null },
        ],
        Player1: {
            previousYahtzee: false,
            bonusPoints: 0,
            scoringChecks: {
                ones: null,
                twos: null,
                threes: null,
                fours: null,
                fives: null,
                sixes: null,
                threeOfAKind: null,
                fourOfAKind: null,
                fullHouse: null,
                smallStraight: null,
                largeStraight: null,
                yahtzee: null,
                chance: null,
            },
        },
        keptDice: [],
    };

    const reducer = (state: GameState, action: Action) => {
        switch (action.type) {
            case "roll-dice":
                if (state.rollsLeft > 0) {
                    state.rollsLeft--;
                    for (const dice of state.rolledDice) {
                        dice.roll = Math.ceil(Math.random() * 6) as DiceRoll;
                    }
                }
                break;
            case "keep-dice":
                if (state.rolledDice.length < 6) {
                    state.keptDice.push(action.payload);
                    state.rolledDice = state.rolledDice.filter(
                        (d) => d.id !== action.payload.id
                    );
                }
                break;
            case "return-dice":
                state.rolledDice.push(action.payload);
                state.keptDice = state.keptDice.filter(
                    (d) => d.id !== action.payload.id
                );
                break;

            case "lock-in-score":
                state.Player1.scoringChecks[
                    action.payload.key as keyof PotentialFullScoring
                ] = action.payload.value;
                break;
            case "next-turn":
                state.rollsLeft = 3;
                state.rolledDice = [
                    { id: 1, roll: null },
                    { id: 2, roll: null },
                    { id: 3, roll: null },
                    { id: 4, roll: null },
                    { id: 5, roll: null },
                ];
                state.keptDice = [];
                break;
            case "end-game":
                state.Player1.scoringChecks = {
                    ones: null,
                    twos: null,
                    threes: null,
                    fours: null,
                    fives: null,
                    sixes: null,
                    threeOfAKind: null,
                    fourOfAKind: null,
                    fullHouse: null,
                    smallStraight: null,
                    largeStraight: null,
                    yahtzee: null,
                    chance: null,
                };

                break;
            case "bonus-points":
                state.Player1.bonusPoints = 35;
                break;
        }
    };

    const [gameState, dispatch] = useImmerReducer(reducer, initialState);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const combinedDice = gameState.rolledDice.concat(gameState.keptDice);

    const [potentialScores, sectionOneScores, sectionTwoScores] =
        calculatePotentialScores(
            combinedDice,
            gameState.Player1.previousYahtzee
        );

    const diceEmojis = {
        1: "⚀",
        2: "⚁",
        3: "⚂",
        4: "⚃",
        5: "⚄",
        6: "⚅",
    };

    const playersCurrentScore = gameState.Player1.scoringChecks;

    useEffect(() => {
        if (
            Object.values(playersCurrentScore).every((score) => score !== null)
        ) {
            onOpen();
        }
    }, [onOpen, playersCurrentScore]);

    const handleCloseMenu = () => {
        onClose();
        dispatch({ type: "end-game" });
        dispatch({ type: "next-turn" });
    };

    const keptDice = [...gameState.keptDice];
    const sortedKeptDice = keptDice.sort((a, b) => {
        const rollA = a.roll || 0;
        const rollB = b.roll || 0;

        return rollA - rollB;
    });

    const playersScores = gameState.Player1.scoringChecks;
    const bonusPoints = gameState.Player1.bonusPoints;
    const currentTotalSection1 = calculateTotals(1, playersScores);
    const currentTotalSection2 = calculateTotals(2, playersScores);

    return (
        <>
            <VStack>
                <Heading as="h3" size="md">
                    Rolls Left: {gameState.rollsLeft}
                </Heading>
                <Button onClick={() => dispatch({ type: "roll-dice" })}>
                    Roll Dice
                </Button>

                <Card
                    justify={"center"}
                    align={"center"}
                    w="30rem"
                    h="15rem"
                    gap={"1rem"}
                >
                    <Text as="u">You rolled:</Text>
                    <Flex gap={"0.75rem"}>
                        {gameState.rollsLeft < 3 &&
                            gameState.rolledDice.map((d) => (
                                <Button
                                    w={"4rem"}
                                    h={"4rem"}
                                    onClick={() =>
                                        dispatch({
                                            type: "keep-dice",
                                            payload: d,
                                        })
                                    }
                                    justifyContent="center"
                                    alignItems={"center"}
                                    key={d.id}
                                    fontSize={"xxx-large"}
                                >
                                    {" "}
                                    {d.roll !== null && diceEmojis[d.roll]}
                                </Button>
                            ))}
                    </Flex>
                    <Text as="u">Dice Kept:</Text>
                    <Flex gap={"0.75rem"}>
                        {sortedKeptDice.map((d) => (
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: "return-dice",
                                        payload: d,
                                    })
                                }
                                w={"4rem"}
                                h={"4rem"}
                                justifyContent="center"
                                alignItems={"center"}
                                textAlign={"center"}
                                key={d.id}
                                fontSize={"xxx-large"}
                            >
                                {" "}
                                {d.roll !== null && diceEmojis[d.roll]}
                            </Button>
                        ))}
                    </Flex>
                </Card>

                <ScoreTable
                    gameState={gameState}
                    dispatch={dispatch}
                    potentialScores={potentialScores}
                    sectionOneScores={sectionOneScores}
                    sectionTwoScores={sectionTwoScores}
                />
            </VStack>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Game Over!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        Here's a summary of how you did:
                        {bonusPoints > 0 ? (
                            <>
                                <Text>In Section 1 you received:</Text>
                                <Tag
                                    fontSize={"1rem"}
                                    size={"md"}
                                    colorScheme="green"
                                >
                                    {currentTotalSection1 + bonusPoints} points{" "}
                                </Tag>{" "}
                                <Text>
                                    Well done on getting the bonus 35 points!
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text>In Section 1 you received:</Text>
                                <Tag
                                    fontSize={"1rem"}
                                    size={"md"}
                                    colorScheme="green"
                                >
                                    {currentTotalSection1} points{" "}
                                </Tag>{" "}
                            </>
                        )}
                        <br />
                        <br />
                        <>
                            <Text>In Section 2 you received:</Text>
                            <Tag
                                fontSize={"1rem"}
                                size={"md"}
                                colorScheme="pink"
                            >
                                {currentTotalSection2} points{" "}
                            </Tag>{" "}
                        </>
                        <>
                            <br />
                            <br />
                            <Text>Giving you a total of:</Text>
                            <Tag
                                fontSize={"1rem"}
                                size={"md"}
                                colorScheme="orange"
                            >
                                {bonusPoints > 0
                                    ? currentTotalSection1 +
                                      bonusPoints +
                                      currentTotalSection2
                                    : currentTotalSection1 +
                                      currentTotalSection2}{" "}
                                points
                            </Tag>{" "}
                        </>
                    </ModalBody>

                    <ModalFooter justifyContent={"center"}>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleCloseMenu}
                        >
                            Try Again?
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
