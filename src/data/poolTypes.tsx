export interface PoolType {
    type_id: number
    entry_fee: string
    type_name: string
    icon: string
}

export const poolTypes: PoolType[] = [
    { type_id: 0, type_name: "Solana Pool", icon: "/sol-logo.png", entry_fee: "0.1 SOL" },
    { type_id: 1, type_name: "Bonk Pool", icon: "/bonk-logo.png", entry_fee: "1 BONK" },
]
