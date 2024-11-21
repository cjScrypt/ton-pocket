import { Cell, beginCell, Address } from "@ton/ton";


export function data(params: { totalSupply: bigint, routerAddress: Address, routerUsdtAddress: Address, pocketWalletCode: Cell, goalPocketCode: Cell }): Cell {
    return beginCell()
        .storeCoins(params.totalSupply)
        .storeAddress(params.routerAddress)
        .storeAddress(params.routerUsdtAddress)
        .storeRef(params.pocketWalletCode)
        .storeRef(params.goalPocketCode)
    .endCell();
}