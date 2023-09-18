import {
    Button,
    Card,
    Flex,
    HStack,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
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
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Leaderboard } from "./Leaderboard";

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
            username: "",
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
        leaderboard: [],
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
                state.Player1 = initialState.Player1;
                break;
            case "bonus-points":
                state.Player1.bonusPoints = 35;
                break;
            case "set-username":
                state.Player1.username = action.payload;
                break;
            case "refresh-leaderboard":
                state.leaderboard = action.payload;
                break;
        }
    };

    const [gameState, dispatch] = useImmerReducer(reducer, initialState);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleFetchLeaderboard = async () => {
        const response = await axios.get(`${baseUrl}/leaderboard`);
        return response.data;
    };

    useEffect(() => {
        handleFetchLeaderboard().then((res) =>
            dispatch({ type: "refresh-leaderboard", payload: res })
        );
    }, [isOpen, dispatch, onClose]);

    const combinedDice = gameState.rolledDice.concat(gameState.keptDice);
    const [potentialScores, sectionOneScores, sectionTwoScores] =
        calculatePotentialScores(
            combinedDice,
            gameState.Player1.previousYahtzee
        );

    const diceEmojis = {
        null: "",
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

    const handleSubmitScore = async () => {
        const section1Score = currentTotalSection1 + bonusPoints;
        await axios.post(`${baseUrl}/leaderboard`, {
            username: gameState.Player1.username,
            score_section_1: section1Score,
            score_section_2: currentTotalSection2,
        });
    };

    return (
        <>
            <VStack>
                <Button
                    variant={"outline"}
                    colorScheme="blue"
                    size={{ base: "sm", lg: "md" }}
                    onClick={() => dispatch({ type: "roll-dice" })}
                    mb={{ base: 1, lg: 2 }}
                    mt={{ base: 1, lg: 2 }}
                >
                    Roll Dice
                </Button>

                <Card justify={"center"} align={"center"} w="100vw">
                    <Heading
                        as="h3"
                        size={{ base: "sm", lg: "md" }}
                        color={gameState.rollsLeft <= 1 ? "red" : "white"}
                        mb={{ base: 1, lg: 2 }}
                        mt={{ base: 1, lg: 2 }}
                    >
                        Rolls Left: {gameState.rollsLeft}
                    </Heading>

                    <Text>You rolled:</Text>
                    <Flex gap={"0.75rem"} minH={"4rem"}>
                        {gameState.rollsLeft < 3 &&
                            gameState.rolledDice.map((d) => (
                                <Button
                                    w={"4rem"}
                                    h={{ base: "3rem", lg: "4rem" }}
                                    onClick={() =>
                                        dispatch({
                                            type: "keep-dice",
                                            payload: d,
                                        })
                                    }
                                    justifyContent="center"
                                    alignItems={"center"}
                                    key={d.id}
                                    fontSize={{
                                        base: "xx-large",
                                        lg: "xxx-large",
                                    }}
                                >
                                    {" "}
                                    {d.roll !== null
                                        ? diceEmojis[d.roll]
                                        : diceEmojis.null}
                                </Button>
                            ))}
                    </Flex>
                    <Text>Dice Kept:</Text>
                    <Flex gap={"0.75rem"} minH={"4rem"}>
                        {sortedKeptDice.map((d) => (
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: "return-dice",
                                        payload: d,
                                    })
                                }
                                w={"4rem"}
                                h={{ base: "3rem", lg: "4rem" }}
                                justifyContent="center"
                                alignItems={"center"}
                                textAlign={"center"}
                                key={d.id}
                                fontSize={{
                                    base: "xx-large",
                                    lg: "xxx-large",
                                }}
                                mb={{ base: 1, lg: 2 }}
                            >
                                {d.roll !== null
                                    ? diceEmojis[d.roll]
                                    : diceEmojis.null}
                            </Button>
                        ))}
                    </Flex>
                </Card>
                <Tabs>
                    <TabList justifyContent={"center"}>
                        <Tab fontSize={{ base: "1rem", lg: "1.5rem" }}>
                            Game
                        </Tab>
                        <Tab fontSize={{ base: "1rem", lg: "1.5rem" }}>
                            Leaderboard
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ScoreTable
                                gameState={gameState}
                                dispatch={dispatch}
                                potentialScores={potentialScores}
                                sectionOneScores={sectionOneScores}
                                sectionTwoScores={sectionTwoScores}
                            />
                        </TabPanel>

                        <TabPanel>
                            {" "}
                            <Leaderboard
                                dispatch={dispatch}
                                leaderboard={gameState.leaderboard}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
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
                        <VStack>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={handleCloseMenu}
                            >
                                Try Again?
                            </Button>

                            <HStack>
                                <Input
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set-username",
                                            payload: e.target.value,
                                        })
                                    }
                                    value={gameState.Player1.username}
                                    placeholder="Input name for leaderboard..."
                                    w={"15rem"}
                                ></Input>
                                <Button
                                    fontSize={"0.7 rem"}
                                    onClick={() => {
                                        handleSubmitScore();
                                        handleCloseMenu();
                                    }}
                                >
                                    Submit High Score
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
