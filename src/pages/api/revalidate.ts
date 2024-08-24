import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        await res.revalidate("/products/static")
        return res.json({revalidated: true})
    } catch (error) {
        res.status(500).send({revalidated: false})
    }
}