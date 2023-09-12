export interface RollDiceAction {
    type: "roll-dice";
}

export interface KeepDiceAction {
    type: "keep-dice";
    payload: Dice;
}

export interface ReturnDiceAction {
    type: "return-dice";
    payload: Dice;
}

export interface LockInScoreAction {
    type: "lock-in-score";
    payload: { key: string; value: number | null };
}

export interface NextTurnAction {
    type: "next-turn";
}

export type Dice = {
    id: number;
    roll: null | DiceRoll;
};

export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export interface Player {
    score: number;
    previousYahtzee: boolean;
    scoringChecks: PotentialFullScoring;
}

export interface PotentialFullScoring {
    ones: number | null;
    twos: number | null;
    threes: number | null;
    fours: number | null;
    fives: number | null;
    sixes: number | null;
    threeOfAKind: number | null;
    fourOfAKind: number | null;
    fullHouse: number | null;
    smallStraight: number | null;
    largeStraight: number | null;
    yahtzee: number | null;
    chance: number | null;
}

export interface DiceCounts {
    ones: { value: number; count: number };
    twos: { value: number; count: number };
    threes: { value: number; count: number };
    fours: { value: number; count: number };
    fives: { value: number; count: number };
    sixes: { value: number; count: number };
}

export interface PotentialSectionOneScoring {
    ones: number | null;
    twos: number | null;
    threes: number | null;
    fours: number | null;
    fives: number | null;
    sixes: number | null;
}

export interface PotentialSectionTwoScoring {
    threeOfAKind: number | null;
    fourOfAKind: number | null;
    fullHouse: number | null;
    smallStraight: number | null;
    largeStraight: number | null;
    yahtzee: number | null;
    chance: number | null;
}

export interface GameState {
    gameTurn: number;
    rollsLeft: number;
    rolledDice: Dice[];
    Player1: Player;
    keptDice: Dice[];
    gameRound: number;
}
