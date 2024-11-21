import { Cell, beginCell, Address } from "@ton/ton";
import { beginMessage } from "./helpers";


export function data(params: { goalId: bigint, target: bigint, ownerAddress: Address, pocketWalletAddress: Address, startTime: bigint, duration: bigint }): Cell {
    return beginCell()
        .storeUint(params.goalId, 64)
        .storeCoins(0)
        .storeCoins(params.target)
        .storeAddress(params.ownerAddress)
        .storeAddress(params.pocketWalletAddress)
        .storeUint(params.startTime, 32)
        .storeUint(params.duration, 32)
    .endCell();
}

export function unlockGoalBalance(params: { amount: bigint,  }) {
    return beginMessage({ op: BigInt(2102) })
        .storeCoins(params.amount)
    .endCell();
}