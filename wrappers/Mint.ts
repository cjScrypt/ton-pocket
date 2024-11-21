import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';
import { data } from "../contracts/mint";

export type MintConfig = {
    totalSupply: bigint;
    routerAddress: Address;
    routerUsdtAddress: Address;
    pocketWalletCode: Cell;
    goalPocketCode: Cell;
};

export function mintConfigToCell(config: MintConfig): Cell {
    return data(config);
}

export class Mint implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Mint(address);
    }

    static createFromConfig(config: MintConfig, code: Cell, workchain = 0) {
        const data = mintConfigToCell(config);
        const init = { code, data };
        return new Mint(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
