import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tag,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Action, GameState } from "../types";
import { calculateTotals } from "../utils/calculateTotals";

interface GameOverModalProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    onOpen: () => void;
    onClose: () => void;
}

export const GameOverModal = ({
    gameState,
    dispatch,
    onOpen,
    onClose,
}: GameOverModalProps): JSX.Element => {
    const { isOpen } = useDisclosure();

    const bonusPoints = gameState.Player1.bonusPoints;
    const playersScores = gameState.Player1.scoringChecks;
    const currentTotalSection1 = calculateTotals(1, playersScores);
    const currentTotalSection2 = calculateTotals(2, playersScores);

    onOpen();

    const handleCloseMenu = () => {
        onClose();
        dispatch({ type: "next-turn" });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Game Over!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        Here's a summary of how you did:
                        {bonusPoints > 0 ? (
                            <>
                                <Text>You received:</Text>
                                <Tag
                                    fontSize={"1rem"}
                                    size={"md"}
                                    colorScheme="green"
                                >
                                    {currentTotalSection1 + bonusPoints} points{" "}
                                </Tag>{" "}
                                <Text>
                                    in Section 1. Well done on getting the bonus
                                    35 points!
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text>You received:</Text>
                                <Tag
                                    fontSize={"1rem"}
                                    size={"md"}
                                    colorScheme="green"
                                >
                                    {currentTotalSection1} points{" "}
                                </Tag>{" "}
                                <Text>in Section 1.</Text>
                            </>
                        )}
                        <br />
                        <>
                            <Text>You received:</Text>
                            <Tag
                                fontSize={"1rem"}
                                size={"md"}
                                colorScheme="pink"
                            >
                                {currentTotalSection2} points{" "}
                            </Tag>{" "}
                            <Text>in Section 2.</Text>
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
};
