import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

// export const middleware = (req: NextRequest) => {
//     const isLogin = true

//     if (isLogin){
//         return NextResponse.next()
//     }
//     return NextResponse.redirect(new URL("/auth/login", req.url))
// }

// export const config = {
//     matcher: ['/products', '/products/server', '/products/static']
// }

export const authMiddleware = (req: NextRequest) => {
    return NextResponse.next()
}

export default withAuth(authMiddleware, ["/products", "/admin"])