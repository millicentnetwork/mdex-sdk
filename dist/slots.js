"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrocSlotReader = void 0;
const tslib_1 = require("tslib");
const ethers_1 = require("ethers");
/* This is the main entry point for the Croc SDK. It provides a high-level interface
 * for interacting with CrocSwap smart contracts in an ergonomic way. */
class CrocSlotReader {
    constructor(context) {
        this.provider = context.then(p => p.provider);
        this.dex = context.then(c => c.dex.address);
    }
    isHotPathOpen() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const STATE_SLOT = 0;
            const HOT_OPEN_OFFSET = 22;
            const hotShiftBits = 8 * (32 - HOT_OPEN_OFFSET);
            const slotVal = this.readSlot(STATE_SLOT).then(ethers_1.BigNumber.from);
            return (yield slotVal).shl(hotShiftBits).shr(255).gt(0);
        });
    }
    readSlot(slot) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.provider).getStorageAt(yield this.dex, slot);
        });
    }
    proxyContract(proxyIdx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const PROXY_SLOT_OFFSET = 1;
            const slotVal = yield this.readSlot(PROXY_SLOT_OFFSET + proxyIdx);
            return "0x" + slotVal.slice(26);
        });
    }
}
exports.CrocSlotReader = CrocSlotReader;
//# sourceMappingURL=slots.js.map