export interface CreateBattlePoolRequest {
    userId?: string;
    address: string;
    trxId: string;
}

export class BlockchainApi {
    private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5107/api";

    async createBattlePool(data: CreateBattlePoolRequest): Promise<boolean> {

        console.log("createBattlePool: " + this.baseUrl);

        const formData = new FormData();
        if (data.userId) formData.append("userId", data.userId);
        formData.append("address", data.address);
        formData.append("trxId", data.trxId);

        const response = await fetch(`${this.baseUrl}/Blockchain/create_battle_pool`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to create battle pool: ${response.status} - ${text}`);
        }

        return await response.json();
    }
}