import { Cell, beginCell, Address } from "@ton/ton";


export function data(params: { spendableBalance: bigint, ownerAddress: Address, mintAddress: Address, pocketWalletCode: Cell, goalPocketCode: Cell, goalBalance: bigint }): Cell {
    return beginCell()
        .storeCoins(params.spendableBalance)
        .storeAddress(params.ownerAddress)
        .storeAddress(params.mintAddress)
        .storeRef(params.pocketWalletCode)
        .storeRef(params.goalPocketCode)
        .storeCoins(params.goalBalance)
    .endCell();
}