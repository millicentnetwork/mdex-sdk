"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateScrollL1Gas = exports.getUnsignedRawTransaction = exports.getRawTransaction = exports.GAS_PADDING = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
const L1GasPriceOracle_1 = require("../abis/external/L1GasPriceOracle");
// Applied to all gas estimates.
exports.GAS_PADDING = 30000;
/**
 * Compute the raw transaction data for a given transaction.
 *
 * ref: https://docs.ethers.org/v5/cookbook/transactions/#cookbook--compute-raw-transaction
 */
function getRawTransaction(tx) {
    function addKey(accum, key) {
        if (tx[key]) {
            accum[key] = tx[key];
        }
        return accum;
    }
    // Extract the relevant parts of the transaction and signature
    const txFields = ["accessList", "chainId", "data", "gasPrice", "gasLimit", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"];
    const sigFields = ["v", "r", "s"];
    // Serialize the signed transaction
    const raw = ethers_1.utils.serializeTransaction(txFields.reduce(addKey, {}), sigFields.reduce(addKey, {}));
    // Double check things went well
    if (ethers_1.utils.keccak256(raw) !== tx.hash) {
        throw new Error("serializing failed!");
    }
    return raw;
}
exports.getRawTransaction = getRawTransaction;
/**
 * Compute the raw transaction data for a given transaction without the signature.
 *
 * ref: https://docs.ethers.org/v5/cookbook/transactions/#cookbook--compute-raw-transaction
 */
function getUnsignedRawTransaction(tx) {
    function addKey(accum, key) {
        if (tx[key]) {
            accum[key] = tx[key];
        }
        return accum;
    }
    // Extract the relevant parts of the transaction and signature
    const txFields = ["accessList", "chainId", "data", "gasPrice", "gasLimit", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"];
    // Serialize the signed transaction
    const raw = ethers_1.utils.serializeTransaction(txFields.reduce(addKey, {}));
    return raw;
}
exports.getUnsignedRawTransaction = getUnsignedRawTransaction;
/**
 * Estimates the additional L1 gas on Scroll for any data which is a RLP-encoded transaction with signature.
 */
function estimateScrollL1Gas(crocEnv, rawTransaction) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const crocContext = yield crocEnv.context;
        const chainId = crocContext.chain.chainId;
        const isScroll = chainId === "0x82750" || chainId === "0x8274f";
        if (!isScroll) {
            return ethers_1.BigNumber.from(0);
        }
        const L1_GAS_PRICE_ORACLE_ADDRESS = "0x5300000000000000000000000000000000000002";
        const l1GasPriceOracle = new ethers_1.Contract(L1_GAS_PRICE_ORACLE_ADDRESS, L1GasPriceOracle_1.L1_GAS_PRICE_ORACLE_ABI, crocContext.provider);
        // function getL1Fee(bytes memory _data) external view override returns (uint256);
        const l1Gas = yield l1GasPriceOracle.getL1Fee(rawTransaction);
        return l1Gas;
    });
}
exports.estimateScrollL1Gas = estimateScrollL1Gas;
//# sourceMappingURL=gas.js.map