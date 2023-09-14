import { checkXStraight } from "./checkXStraight";

test("checkXStraight should check a list of dice rolls for x consecutive numbers- a large straight (5) should count as a small straight (4)", () => {
    expect(
        checkXStraight(
            {
                ones: { value: 1, count: 1 },
                twos: { value: 2, count: 1 },
                threes: { value: 3, count: 1 },
                fours: { value: 4, count: 1 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 0 },
            },
            4
        )
    ).toBe(30);
    expect(
        checkXStraight(
            {
                ones: { value: 1, count: 0 },
                twos: { value: 2, count: 1 },
                threes: { value: 3, count: 1 },
                fours: { value: 4, count: 1 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 1 },
            },
            5
        )
    ).toBe(40);
});

test("checkXStraight should return 0 if there is not the amount of consecutive rolls for that specified length (4 or 5)", () => {
    expect(
        checkXStraight(
            {
                ones: { value: 1, count: 1 },
                twos: { value: 2, count: 1 },
                threes: { value: 3, count: 1 },
                fours: { value: 4, count: 0 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 1 },
            },
            4
        )
    ).toBe(0);
    expect(
        checkXStraight(
            {
                ones: { value: 1, count: 1 },
                twos: { value: 2, count: 1 },
                threes: { value: 3, count: 1 },
                fours: { value: 4, count: 0 },
                fives: { value: 5, count: 1 },
                sixes: { value: 6, count: 1 },
            },
            5
        )
    ).toBe(0);
});
