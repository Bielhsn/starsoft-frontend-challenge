import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        // Buscar todos os NFTs da API externa
        const response = await fetch("https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products");

        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        // Filtrar o NFT específico pelo ID
        const nft = result.data.find((n: any) => n.id == id);

        if (!nft) {
            return res.status(404).json({ error: `NFT com ID ${id} não encontrado` });
        }

        // Retornar os detalhes do NFT
        return res.status(200).json(nft);

    } catch (error: any) {
        console.error("Erro ao buscar NFT:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
