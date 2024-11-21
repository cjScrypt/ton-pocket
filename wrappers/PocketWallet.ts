import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';
import { data } from "../contracts/pocket_wallet";

export type PocketWalletConfig = {
    spendableBalance: bigint;
    ownerAddress: Address;
    jettonMasterAddress: Address;
    jettonWalletCode: Cell;
    goalPocketCode: Cell;
    goalBalance: bigint;
};

export function pocketWalletConfigToCell(config: PocketWalletConfig): Cell {
    return data(config);
}

export class PocketWallet implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new PocketWallet(address);
    }

    static createFromConfig(config: PocketWalletConfig, code: Cell, workchain = 0) {
        const data = pocketWalletConfigToCell(config);
        const init = { code, data };
        return new PocketWallet(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
