import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';
import { data } from "../contracts/goal_pocket";

export type GoalPocketConfig = {
    goalId: bigint;
    target: bigint;
    ownerAddress: Address;
    pocketWalletAddress: Address;
    startTime: bigint;
    duration: bigint;
};

export function goalPocketConfigToCell(config: GoalPocketConfig): Cell {
    return data(config);
}

export class GoalPocket implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new GoalPocket(address);
    }

    static createFromConfig(config: GoalPocketConfig, code: Cell, workchain = 0) {
        const data = goalPocketConfigToCell(config);
        const init = { code, data };
        return new GoalPocket(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
