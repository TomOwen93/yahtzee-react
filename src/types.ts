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

export interface EndGameAction {
    type: "end-game";
}

export interface BonusPointsAction {
    type: "bonus-points";
}

export interface SetUsernameAction {
    type: "set-username";
    payload: string;
}

export interface RefreshLeaderboardAction {
    type: "refresh-leaderboard";
    payload: LeaderboardList[];
}

export type Action =
    | RollDiceAction
    | KeepDiceAction
    | ReturnDiceAction
    | LockInScoreAction
    | NextTurnAction
    | EndGameAction
    | BonusPointsAction
    | SetUsernameAction
    | RefreshLeaderboardAction;
export type Dice = {
    id: number;
    roll: null | DiceRoll;
};

export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

export interface Player {
    username: string;
    bonusPoints: number;
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
    leaderboard: LeaderboardList[];
    rollsLeft: number;
    rolledDice: Dice[];
    Player1: Player;
    keptDice: Dice[];
}

export interface LeaderboardList {
    creation_date: Date;
    id: number;
    score_section_1: number;
    score_section_2: number;
    user_id: number;
    username: string;
}
