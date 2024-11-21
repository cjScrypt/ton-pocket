import { Cell, beginCell, Address } from "@ton/ton";
import { beginMessage } from "./helpers";


export function data(params: { goalPocketCode: Cell, mintCode: Cell, pocketWalletCode: Cell }): Cell {
    return beginCell()
        .storeRef(params.goalPocketCode)
        .storeRef(params.mintCode)
        .storeRef(params.pocketWalletCode)
    .endCell();
}


export function fundUser(params: {
    amount: bigint,
    recipientAddress: Address,
    routerAddress: Address,
    senderAddress: Address,
    forwardTonAmount: bigint,
    customPayload: Cell | null
}): Cell {
    let forwardPayload = beginCell()
        .storeUint(2104, 32)
        .storeAddress(params.recipientAddress)
    if (params.customPayload) {
        forwardPayload.storeRef(params.customPayload);
    }
    forwardPayload.endCell();

    return beginMessage({ op: BigInt(0xf8a7ea5) })
        .storeCoins(params.amount)
        .storeAddress(params.routerAddress)
        .storeAddress(params.senderAddress)
        .storeDict()
        .storeCoins(params.forwardTonAmount)
        .storeRef(forwardPayload)
    .endCell();
}


export function fundGoal(
    goalParams: { goalId: number, targetAmount: bigint, startTime: bigint, duration: bigint },
    params: { amount: bigint, recipientAddress: Address, routerAddress: Address, senderAddress: Address, forwardTonAmount: bigint }
): Cell {
    const goalCustomPayload = beginCell()
        .storeUint(goalParams.goalId, 64)
        .storeCoins(goalParams.targetAmount)
        .storeUint(goalParams.startTime, 32)
        .storeUint(goalParams.duration, 32)
    .endCell();

    return fundUser({
        amount: params.amount, recipientAddress: params.recipientAddress,
        routerAddress: params.routerAddress, senderAddress: params.senderAddress,
        forwardTonAmount: params.forwardTonAmount, customPayload: goalCustomPayload
    });
}

