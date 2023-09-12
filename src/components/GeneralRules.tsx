import { Text } from "@chakra-ui/react";

export const GeneralRules = () => (
    <>
        <Text as={"b"}>Rolling Dice:</Text>
        <br />
        Click "Roll Dice" to roll five dice. You can roll up to three times per
        turn.
        <br />
        <br />
        <Text as={"b"}>Selecting Dice:</Text>
        <br />
        Click on the dice you want to keep. You can choose which dice to keep
        after each roll.
        <br />
        <br />
        <Text as={"b"}> Filling Out Scorecard: </Text>
        <br />
        Click on a category to lock in your score. Once chosen, a category
        cannot be changed.
        <br />
        <br />
        <Text as={"b"}>End of Game: </Text> <br /> Play 13 rounds (one for each
        category). Total your points after all rounds. The player with the
        highest score wins.
    </>
);
