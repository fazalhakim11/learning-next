import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider  from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CreadentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }
                const user:any = await signIn({email})
                if(user){
                    const passwordConfirm = await compare(password, user.password)
                    if (passwordConfirm) {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt({token, account, profile, user}){
            if(account?.provider === "credentials"){
                token.email = user.email
                token.role = user.role
            }
            return token
        },

        async session({session, token}: any){
            if("email" in token ) {
                session.user.email = token.email
            }
            if("role" in token ) {
                session.user.role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login"
    }
}

export default NextAuth(authOptions)