import { Provider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";
import { ChainSpec } from "./constants";
export interface CrocContext {
    provider: Provider;
    dex: Contract;
    router?: Contract;
    routerBypass?: Contract;
    query: Contract;
    slipQuery: Contract;
    erc20Read: Contract;
    erc20Write: Contract;
    chain: ChainSpec;
    senderAddr?: string;
}
export type ChainIdentifier = number | string;
export type ConnectArg = Provider | Signer | ChainIdentifier;
export declare function connectCroc(providerOrChainId: ConnectArg, signer?: Signer): Promise<CrocContext>;
export declare function lookupChain(chainId: number | string): ChainSpec;
