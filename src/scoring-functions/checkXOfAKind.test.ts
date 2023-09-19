import { checkXOfAKind } from "./checkXOfAKind";

test("checkXOfAKind should check a list of dice rolls for the highest x multiple of any roll", () => {
    expect(
        checkXOfAKind(
            {
                ones: { value: 1, count: 0 },
                twos: { value: 2, count: 0 },
                threes: { value: 3, count: 0 },
                fours: { value: 4, count: 4 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 0 },
            },
            3
        )
    ).toBe(21);
    expect(
        checkXOfAKind(
            {
                ones: { value: 1, count: 0 },
                twos: { value: 2, count: 0 },
                threes: { value: 3, count: 0 },
                fours: { value: 4, count: 4 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 0 },
            },
            4
        )
    ).toBe(21);
});
