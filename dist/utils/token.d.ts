import { BigNumber } from "ethers";
export declare function getBaseTokenAddress(token1: string, token2: string): string;
export declare function getQuoteTokenAddress(token1: string, token2: string): string;
export declare function sortBaseQuoteTokens(token1: string, token2: string): [string, string];
export declare function fromDisplayQty(qty: string, tokenDecimals: number): BigNumber;
export declare function toDisplayQty(qty: string | number | BigNumber, tokenDecimals: number): string;
