"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupChain = exports.connectCroc = void 0;
const tslib_1 = require("tslib");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const constants_1 = require("./constants");
const abis_1 = require("./abis");
const constants_2 = require("@ethersproject/constants");
const impact_1 = require("./abis/impact");
const erc20_read_1 = require("./abis/erc20.read");
function connectCroc(providerOrChainId, signer) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const [provider, maybeSigner] = yield buildProvider(providerOrChainId, signer);
        return setupProvider(provider, maybeSigner);
    });
}
exports.connectCroc = connectCroc;
function buildProvider(arg, signer) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (typeof arg === "number" || typeof arg == "string") {
            const context = lookupChain(arg);
            return buildProvider(new providers_1.JsonRpcProvider(context.nodeUrl), signer);
        }
        else if ("getNetwork" in arg) {
            return [arg, signer];
        }
        else {
            const chainId = yield arg.getChainId();
            return buildProvider(chainId, signer);
        }
    });
}
function setupProvider(provider, signer) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const actor = determineActor(provider, signer);
        const chainId = yield getChain(provider);
        let cntx = inflateContracts(chainId, provider, actor);
        return yield attachSenderAddr(cntx, actor);
    });
}
function attachSenderAddr(cntx, actor) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ('getAddress' in actor) {
            try {
                cntx.senderAddr = yield actor.getAddress();
            }
            catch (e) { }
        }
        return cntx;
    });
}
function determineActor(provider, signer) {
    if (signer) {
        try {
            return signer.connect(provider);
        }
        catch (_a) {
            return signer;
        }
    }
    else if ("getSigner" in provider) {
        try {
            let signer = provider.getSigner();
            return signer;
        }
        catch (_b) {
            return provider;
        }
    }
    else {
        return provider;
    }
}
function getChain(provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ("chainId" in provider) {
            return provider.chainId;
        }
        else if ("getNetwork" in provider) {
            return provider.getNetwork().then((n) => n.chainId);
        }
        else {
            throw new Error("Invalid provider");
        }
    });
}
function inflateContracts(chainId, provider, actor, addr) {
    const context = lookupChain(chainId);
    return {
        provider: provider,
        dex: new ethers_1.Contract(context.addrs.dex, abis_1.CROC_ABI, actor),
        router: context.addrs.router ? new ethers_1.Contract(context.addrs.router || constants_2.AddressZero, abis_1.CROC_ABI, actor) : undefined,
        routerBypass: context.addrs.routerBypass ? new ethers_1.Contract(context.addrs.routerBypass || constants_2.AddressZero, abis_1.CROC_ABI, actor) : undefined,
        query: new ethers_1.Contract(context.addrs.query, abis_1.QUERY_ABI, provider),
        slipQuery: new ethers_1.Contract(context.addrs.impact, impact_1.IMPACT_ABI, provider),
        erc20Write: new ethers_1.Contract(constants_2.AddressZero, abis_1.ERC20_ABI, actor),
        erc20Read: new ethers_1.Contract(constants_2.AddressZero, erc20_read_1.ERC20_READ_ABI, provider),
        chain: context,
        senderAddr: addr
    };
}
function lookupChain(chainId) {
    if (typeof chainId === "number") {
        return lookupChain("0x" + chainId.toString(16));
    }
    else {
        const context = constants_1.CHAIN_SPECS[chainId.toLowerCase()];
        if (!context) {
            throw new Error("Unsupported chain ID: " + chainId);
        }
        return context;
    }
}
exports.lookupChain = lookupChain;
//# sourceMappingURL=context.js.map