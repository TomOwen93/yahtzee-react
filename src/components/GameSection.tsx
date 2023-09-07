import { Button, Text, VStack } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";

interface Action {
    type: "roll-dice";
    payload?: GameState | number | string;
}

type Dice = {
    id: number;
    roll: undefined | number;
};

interface GameState {
    gameTurn: number;
    currentPlayer: number;
    rollsLeft: number;
    dice: Dice[];
    gameOver: boolean;
    playerScores: {
        player1: number;
        player2: number;
    };
}

export default function GameSection(): JSX.Element {
    const initialState: GameState = {
        gameTurn: 0,
        currentPlayer: 1,
        rollsLeft: 3,
        dice: [
            { id: 1, roll: undefined },
            { id: 2, roll: undefined },
            { id: 3, roll: undefined },
            { id: 4, roll: undefined },
            { id: 5, roll: undefined },
        ],
        gameOver: false,
        playerScores: {
            player1: 0,
            player2: 0,
        },
    };

    const reducer = (state: GameState, action: Action) => {
        switch (action.type) {
            case "roll-dice":
                if (state.rollsLeft > 0) {
                    state.rollsLeft--;
                    for (const dice of state.dice) {
                        dice.roll = Math.ceil(Math.random() * 6);
                    }
                }
        }
    };

    const [gameState, dispatch] = useImmerReducer(reducer, initialState);

    return (
        <>
            <VStack>
                <Text>Rolls Left: {gameState.rollsLeft}</Text>
                <Button onClick={() => dispatch({ type: "roll-dice" })}>
                    Roll Dice
                </Button>
                <Text>You rolled:</Text>
                {gameState.dice.map((d) => (
                    <Button maxW={"2rem"} textAlign={"center"} key={d.id}>
                        {" "}
                        {d.roll}
                    </Button>
                ))}
            </VStack>
        </>
    );
}
