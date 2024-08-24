import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.data === "products") {
    try {
      await res.revalidate("/products/static");
      return res.json({ revalidated: true });
    } catch (error) {
      res.status(500).send({ revalidated: false });
    }
  }
  return res.json({
    revalidated: false,
    message: "Select data to revalidate!"
  })
}
