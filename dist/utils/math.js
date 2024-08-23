"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFixedGrowth = exports.truncateRightBits = exports.floatToBigNum = exports.bigNumToFloat = exports.toFixedNumber = void 0;
const ethers_1 = require("ethers");
function toFixedNumber(num, digits, base) {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
}
exports.toFixedNumber = toFixedNumber;
function bigNumToFloat(val) {
    return val.lt(Number.MAX_SAFE_INTEGER - 1)
        ? val.toNumber()
        : parseFloat(val.toString());
}
exports.bigNumToFloat = bigNumToFloat;
function floatToBigNum(x) {
    let floatPrice = x;
    let scale = 0;
    const PRECISION_BITS = 16;
    while (floatPrice > Number.MAX_SAFE_INTEGER) {
        floatPrice = floatPrice / (2 ** PRECISION_BITS);
        scale = scale + PRECISION_BITS;
    }
    const pinPrice = Math.round(floatPrice);
    const mult = ethers_1.BigNumber.from(2).pow(scale);
    return ethers_1.BigNumber.from(pinPrice).mul(mult);
}
exports.floatToBigNum = floatToBigNum;
function truncateRightBits(x, bits) {
    const mult = ethers_1.BigNumber.from(2).pow(bits);
    return x.div(mult).mul(mult);
}
exports.truncateRightBits = truncateRightBits;
function fromFixedGrowth(x) {
    return 1 + bigNumToFloat(x) / (2 ** 48);
}
exports.fromFixedGrowth = fromFixedGrowth;
//# sourceMappingURL=math.js.map