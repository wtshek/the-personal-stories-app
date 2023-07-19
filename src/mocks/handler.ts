import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:300/search/config", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          gender: [
            { _id: { $oid: "64b2bcb7d494db4be50a9abc" }, label: "Female" },
            { _id: { $oid: "64b2bcb7d494db4be50a9abd" }, label: "Male" },
          ],
          industries: [
            {
              _id: { $oid: "64b2bcb7d494db4be50a9abe" },
              label: "Agriculture and Farming",
            },
            { _id: { $oid: "64b2bcb7d494db4be50a9abf" }, label: "Automotive" },
            { _id: { $oid: "64b2bcb7d494db4be50a9ac0" }, label: "Aviation" },
          ],
        },
      }),
    );
  }),
];
