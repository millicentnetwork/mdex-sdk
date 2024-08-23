import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, BigNumberish } from "ethers";
import { CrocPoolView } from "../pool";
interface RepositionTarget {
    mint: TickRange | AmbientRange;
    burn: TickRange;
    liquidity: BigNumberish;
}
type AmbientRange = "ambient";
export interface CrocRepositionOpts {
    impact?: number;
}
export declare class CrocReposition {
    constructor(pool: CrocPoolView, target: RepositionTarget, opts?: CrocRepositionOpts);
    rebal(): Promise<TransactionResponse>;
    simStatic(): Promise<any>;
    balancePercent(): Promise<number>;
    currentCollateral(): Promise<BigNumber>;
    convertCollateral(): Promise<BigNumber>;
    postBalance(): Promise<[number, number]>;
    mintInput(): Promise<string>;
    swapOutput(): Promise<string>;
    private isBaseOutOfRange;
    private pivotTokens;
    private formatDirective;
    private setupSwap;
    private swapFraction;
    pool: CrocPoolView;
    burnRange: TickRange;
    mintRange: TickRange | AmbientRange;
    liquidity: BigNumber;
    spotPrice: Promise<number>;
    spotTick: Promise<number>;
    impact: number;
}
type TickRange = [number, number];
export {};
