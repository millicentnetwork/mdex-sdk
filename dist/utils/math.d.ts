import { BigNumber } from 'ethers';
export declare function toFixedNumber(num: number, digits: number, base?: number): number;
export declare function bigNumToFloat(val: BigNumber): number;
export declare function floatToBigNum(x: number): BigNumber;
export declare function truncateRightBits(x: BigNumber, bits: number): BigNumber;
export declare function fromFixedGrowth(x: BigNumber): number;
