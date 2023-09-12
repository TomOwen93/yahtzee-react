import { UnorderedList, ListItem, Text } from "@chakra-ui/react";

export const CategoryRules = () => (
    <>
        <UnorderedList>
            <ListItem>
                <Text as={"b"}>Ones through Sixes:</Text> <br /> Sum of matching
                dice.
            </ListItem>
            <ListItem>
                <Text as={"b"}>Three of a Kind, Four of a Kind: </Text> <br />{" "}
                Sum of all dice if requirements are met.
            </ListItem>
            <ListItem>
                <Text as={"b"}> Specific combinations:</Text>
                <UnorderedList>
                    <ListItem>
                        <Text as="b">Full House - 25 points</Text> <br />
                        Three dice of one number and two dice of another number.
                    </ListItem>{" "}
                    <ListItem>
                        <Text as="b">Small Straight - 30 points</Text> <br />
                        Four consecutive numbers in the roll
                    </ListItem>{" "}
                    <ListItem>
                        <Text as="b">Large Straight - 40 points</Text> <br />
                        All five consecutive numbers in the roll
                    </ListItem>{" "}
                    <ListItem>
                        <Text as="b">
                            Yahtzee - 50 points (100 on successive)
                        </Text>{" "}
                        <br />
                        All five dice showing the same number
                    </ListItem>
                </UnorderedList>
            </ListItem>
            <ListItem>
                {" "}
                <Text as="b">Chance:</Text> <br /> Sum of all dice.
            </ListItem>
            <ListItem>
                <Text as="b"> Bonus: </Text> <br /> Awarded for a total of 63+
                points in Ones through Sixes.
            </ListItem>
        </UnorderedList>
    </>
);
