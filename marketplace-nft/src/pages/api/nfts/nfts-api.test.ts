import fetch from 'node-fetch';
(global as any).fetch = fetch;

import { createMocks } from "node-mocks-http";
const handler = require("../nfts/[id]").default;

describe("API /api/nfts/[id]", () => {
  it("deve retornar um NFT pelo ID", async () => {
    const { req, res } = createMocks({ method: "GET", query: { id: "1" } });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toHaveProperty("id", 1);
  });

  it("deve retornar erro se o NFT não for encontrado", async () => {
    const { req, res } = createMocks({ method: "GET", query: { id: "9999" } });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
  });
});