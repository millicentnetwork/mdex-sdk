"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDisplayQty = exports.fromDisplayQty = exports.sortBaseQuoteTokens = exports.getQuoteTokenAddress = exports.getBaseTokenAddress = void 0;
const ethers_1 = require("ethers");
function getBaseTokenAddress(token1, token2) {
    let baseTokenAddress = "";
    if (!!token1 && !!token2) {
        const token1BigNum = ethers_1.BigNumber.from(token1);
        const token2BigNum = ethers_1.BigNumber.from(token2);
        // On-chain base token is always the smaller of the two
        baseTokenAddress = token1BigNum.lt(token2BigNum) ? token1 : token2;
    }
    return baseTokenAddress;
}
exports.getBaseTokenAddress = getBaseTokenAddress;
function getQuoteTokenAddress(token1, token2) {
    let quoteTokenAddress = "";
    if (!!token1 && !!token2) {
        const token1BigNum = ethers_1.BigNumber.from(token1);
        const token2BigNum = ethers_1.BigNumber.from(token2);
        // On-chain quote token is always the larger of the two
        quoteTokenAddress = token1BigNum.gt(token2BigNum) ? token1 : token2;
    }
    return quoteTokenAddress;
}
exports.getQuoteTokenAddress = getQuoteTokenAddress;
function sortBaseQuoteTokens(token1, token2) {
    return [
        getBaseTokenAddress(token1, token2),
        getQuoteTokenAddress(token1, token2),
    ];
}
exports.sortBaseQuoteTokens = sortBaseQuoteTokens;
function fromDisplayQty(qty, tokenDecimals) {
    try {
        // First try to directly parse the string, so there's no loss of precision for
        // long fixed strings.
        return ethers_1.ethers.utils.parseUnits(qty, tokenDecimals);
    }
    catch (_a) {
        // If that fails (e.g. with scientific notation floats), then cast to float and
        // back to fixed string
        const sanitQty = parseFloat(qty).toFixed(tokenDecimals);
        return ethers_1.ethers.utils.parseUnits(sanitQty, tokenDecimals);
    }
}
exports.fromDisplayQty = fromDisplayQty;
function toDisplayQty(qty, tokenDecimals) {
    // formatUnits is temperamental with Javascript numbers, so convert string to
    // fullwide string to avoid scientific notation (which BigNumber pukes on)
    if (typeof (qty) === "number") {
        const qtyString = qty.toLocaleString('fullwide', { useGrouping: false });
        return toDisplayQty(qtyString, tokenDecimals);
    }
    return ethers_1.ethers.utils.formatUnits(qty, tokenDecimals);
}
exports.toDisplayQty = toDisplayQty;
//# sourceMappingURL=token.js.map