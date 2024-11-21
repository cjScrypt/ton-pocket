import { Cell, beginCell, Address } from "@ton/ton";


export function data(params: { spendableBalance: bigint, ownerAddress: Address, jettonMasterAddress: Address, jettonWalletCode: Cell, goalPocketCode: Cell, goalBalance: bigint }): Cell {
    return beginCell()
        .storeCoins(params.spendableBalance)
        .storeAddress(params.ownerAddress)
        .storeAddress(params.jettonMasterAddress)
        .storeRef(params.jettonWalletCode)
        .storeRef(params.goalPocketCode)
        .storeCoins(params.goalBalance)
    .endCell();
}