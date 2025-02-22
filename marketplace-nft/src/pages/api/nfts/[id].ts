import { NextApiRequest, NextApiResponse } from "next";

interface NFT {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const parsedId = Number(id); // Converte 'id' da query para número
    try {
        // Buscar todos os NFTs da API externa
        const response = await fetch("https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products");

        // Verifica se 'id' é um número válido
        if (isNaN(parsedId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        if (!response.ok) {
            throw new Error(`Erro na API externa: ${response.status} ${response.statusText}`);
        }

        const result: { data: NFT[] } = await response.json();

        // Filtrar o NFT específico pelo ID
        const nft = result.data.find((n: NFT) => Number(n.id) === parsedId);  // Convertendo 'n.id' para número

        if (!nft) {
            return res.status(404).json({ error: `NFT com ID ${id} não encontrado` });
        }

        // Retornar os detalhes do NFT
        return res.status(200).json(nft);

    } catch (error) {
        console.error("Erro ao buscar NFT:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
