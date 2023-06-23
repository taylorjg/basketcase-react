import { rest } from "msw";

import all from "./fixtures/all.json";

const mockSearchHandler = (_req, res, ctx) => {
  const allPage1 = {
    ...all,
    results: {
      ...all.results,
      products: all.results.products.slice(0, 10),
    },
  };
  return res(ctx.status(200), ctx.json(allPage1));
};

export const handlers = [rest.post(/\/api\/search$/, mockSearchHandler)];
