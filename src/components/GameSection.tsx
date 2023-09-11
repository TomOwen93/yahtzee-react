import { Button, Text, VStack, Card, Heading } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";
import ScoreTable from "./ScoreTable";
import {
    RollDiceAction,
    KeepDiceAction,
    GameState,
    ReturnDiceAction,
    LockInScoreAction,
    DiceRoll,
    PotentialFullScoring,
    NextTurnAction,
} from "../types";
import { calculatePotentialScores } from "../utils/calculatePotentialScores";

export type Action =
    | RollDiceAction
    | KeepDiceAction
    | ReturnDiceAction
    | LockInScoreAction
    | NextTurnAction;

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
            score: 0,
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
        }
    };

    const [gameState, dispatch] = useImmerReducer(reducer, initialState);

    const combinedDice = gameState.rolledDice.concat(gameState.keptDice);
    const potentialScores = calculatePotentialScores(
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

    return (
        <>
            <VStack>
                <Heading as="h3" size="md">
                    Rolls Left: {gameState.rollsLeft}
                </Heading>
                <Button onClick={() => dispatch({ type: "roll-dice" })}>
                    Roll Dice
                </Button>

                <Card align={"center"} w="400px">
                    <Text>You rolled:</Text>
                    {gameState.rollsLeft < 3 &&
                        gameState.rolledDice.map((d) => (
                            <Button
                                onClick={() =>
                                    dispatch({ type: "keep-dice", payload: d })
                                }
                                textAlign={"center"}
                                key={d.id}
                                fontSize={"xx-large"}
                            >
                                {" "}
                                {d.roll !== null && diceEmojis[d.roll]}
                            </Button>
                        ))}
                    <Text>Dice Kept:</Text>
                    {gameState.keptDice.map((d) => (
                        <Button
                            onClick={() =>
                                dispatch({ type: "return-dice", payload: d })
                            }
                            textAlign={"center"}
                            key={d.id}
                            fontSize={"xx-large"}
                        >
                            {" "}
                            {d.roll !== null && diceEmojis[d.roll]}
                        </Button>
                    ))}
                </Card>

                <ScoreTable
                    gameState={gameState}
                    dispatch={dispatch}
                    potentialScores={potentialScores}
                />
            </VStack>
        </>
    );
}
