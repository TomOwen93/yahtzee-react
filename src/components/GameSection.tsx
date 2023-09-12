import { Button, Text, VStack, Card, Heading, Flex } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";
import ScoreTable from "./ScoreTable";
import { GameState, DiceRoll, PotentialFullScoring, Action } from "../types";
import { calculatePotentialScores } from "../utils/calculatePotentialScores";

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
            gameScores: {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
            },
        },
        keptDice: [],
        gameRound: 1,
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
                state.Player1.gameScores[gameState.gameRound] =
                    playersCurrentScore;
                state.gameRound = +1;
                state.Player1.scoringChecks = {} as PotentialFullScoring;
        }
    };

    const [gameState, dispatch] = useImmerReducer(reducer, initialState);

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

    if (Object.values(playersCurrentScore).every((score) => score !== null)) {
        dispatch({ type: "end-game" });
        dispatch({ type: "next-turn" });
    }

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
                    <Text>You rolled:</Text>
                    <Flex gap={"0.75rem"}>
                        {gameState.rollsLeft < 3 &&
                            gameState.rolledDice.map((d) => (
                                <Button
                                    onClick={() =>
                                        dispatch({
                                            type: "keep-dice",
                                            payload: d,
                                        })
                                    }
                                    textAlign={"center"}
                                    key={d.id}
                                    fontSize={"xx-large"}
                                >
                                    {" "}
                                    {d.roll !== null && diceEmojis[d.roll]}
                                </Button>
                            ))}
                    </Flex>
                    <Text>Dice Kept:</Text>
                    <Flex gap={"0.75rem"}>
                        {gameState.keptDice.map((d) => (
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: "return-dice",
                                        payload: d,
                                    })
                                }
                                textAlign={"center"}
                                key={d.id}
                                fontSize={"xx-large"}
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
        </>
    );
}
