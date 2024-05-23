import { BigNumberish } from "ethers";
export declare class KnockoutEncoder {
    constructor(base: string, quote: string, poolIdx: number);
    private base;
    private quote;
    private poolIdx;
    private abiCoder;
    encodeKnockoutMint(qty: BigNumberish, lowerTick: number, upperTick: number, isBid: boolean, useSurplusFlags: number): string;
    encodeKnockoutBurnQty(qty: BigNumberish, lowerTick: number, upperTick: number, isBid: boolean, useSurplusFlags: number): string;
    encodeKnockoutBurnLiq(liq: BigNumberish, lowerTick: number, upperTick: number, isBid: boolean, useSurplusFlags: number): string;
    encodeKnockoutRecover(pivotTime: number, lowerTick: number, upperTick: number, isBid: boolean, useSurplusFlags: number): string;
    private encodeCommonArgs;
}
