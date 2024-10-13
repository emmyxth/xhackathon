import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID as string,
      clientSecret: process.env.AUTH_TWITTER_SECRET as string,
      version: "2.0",
      authorization: {
        params:{
          scope: "users.read tweet.read offline.access like.read bookmark.read"
        }
        
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        console.log(account)
        token.username = profile?.data.username ?? null
        token.id_str = profile?.data.id ?? null
      }
      return token
    },
    async session({session, token}) {
      console.log(token)
      session.user.handle = token.username as string
      session.user.id_str = token.id_str as string
      session.user.access_token = token.accessToken as string
      return session
    }
  },

})

export { handler as GET, handler as POST };
