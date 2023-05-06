import cardR from './CardRule'
import { isBeat, getCategory } from './CardRule';

const pair = [1,2];
const PairChain = [4,7,9,10,12,13];
const WrongPairChian = [0,3,4,7];
const trio = [8,9,10];
const trioSingle = [12,13,14,16]; //6,7
const trioPair = [16,17,18,20,21];//7,8
const TrioChain = [20,21,22,24,25,26];//8,9
const TrioChainWithSingles = [20,21,22,24,25,26,0,8];//888999 3,5
const TrioChainWithSingles2 = [16,17,18,20,21,22,0,8];//777888 3,5
const Wrong1TrioChainWithSingles = [16,17,18,24,25,26,1,5]//777999 12
const Wrong2TrioChainWithSingles = [12,13,14,20,21,22,24,25,26,0,8,32];//666 888999 3,5,j
const Wrong3TrioChainWithSingles = [16,17,18,20,21,22,24,25,26,0,8];//777888999 3,5
const TrioChainWithPairs = [20,21,22,24,25,26,0,1,8,9]//888999 3355
const TrioChainWithPairs2 = [16,17,18,20,21,22,24,25,26,0,1,8,9,12,13]//777888999 335566
const Wrong1TrioChainWithPairs = [12,13,14,20,21,22,24,25,26,0,1,8,9,36,37]//666888999 3355kk

const boom = [28,29,30,31]; //10
const rocket = [52,53];

describe('Check Category', () => {
    test("Single", () => {
        const single = [0];
        expect(getCategory(single)).toEqual(
            {"CategoryType":"Single","weight":1,"miniValue":"3"});
    });

    test("Rocket", () => {
        expect(getCategory(rocket)).toEqual(
            {"CategoryType":"Rocket","weight":3});
    });

	test("Pair", () => {
        expect(getCategory(pair)).toEqual(
            {"CategoryType":"Pair","weight":1,"miniValue":"3"});
    });

    test("PairChain", () => {
        expect(getCategory(PairChain)).toEqual(
            {"CategoryType":"PairChain","weight":1,"miniValue":"4"});
    });

    test("Trio", () => {
        expect(getCategory(trio)).toEqual(
            {"CategoryType":"Trio","weight":1,"miniValue":"5"});
    });

    test("TrioPair", () => {
        expect(getCategory(trioPair)).toEqual(
            {"CategoryType":"TrioWithPair","weight":1,"miniValue":"7"});
    });

    test("TrioChain", () => {
        expect(getCategory(TrioChain)).toEqual(
            {"CategoryType":"TrioChain","weight":1,"miniValue":"8"});
    });

    test("TrioChainWithSingles", () => {
        expect(getCategory(TrioChainWithSingles)).toEqual(
            {"CategoryType":"TrioChainWithSingles","weight":1,"miniValue":"8"});
    });

    test("2 TrioChainWithSingles", () => {
        expect(getCategory(TrioChainWithSingles2)).toEqual(
            {"CategoryType":"TrioChainWithSingles","weight":1,"miniValue":"7"});
    });

    test("1 WrongTrioChainWithSingle", () => {
        expect(getCategory(Wrong1TrioChainWithSingles)).toBeFalsy();
    });

    test("2 WrongTrioChainWithSingle", () => {
        expect(getCategory(Wrong2TrioChainWithSingles)).toBeFalsy();
    });

    test("3 WrongTrioChainWithSingle", () => {
        expect(getCategory(Wrong3TrioChainWithSingles)).toBeFalsy();
    });

    test("TrioChainWithPair", () => {
        expect(getCategory(TrioChainWithPairs)).toEqual(
            {"CategoryType":"TrioChainWithPairs","weight":1,"miniValue":"8"});
    });

    test("TrioChainWithPair2", () => {
        expect(getCategory(TrioChainWithPairs2)).toEqual(
            {"CategoryType":"TrioChainWithPairs","weight":1,"miniValue":"7"});
    });

    test("1 WrongTrioChainWithPairs", () => {
        expect(getCategory(Wrong1TrioChainWithPairs)).toBeFalsy();
    });
});

describe('Compare Category', () => {
    test("Compare Single", () => {
        const single = [0];
        const single2 = [1];
        expect(isBeat(single,single2)).toBeFalsy();
    });

    test("Compare Single with Roekct", () => {
        const single = [0];
        expect(isBeat(single,rocket)).toBeTruthy();
    });
	
});