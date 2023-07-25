import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_G_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_G_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: token.accessToken,
          accessTokenExpires: account.expires_at * 1000,
          user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
    },
    session({ session, token, user }: any) {
      return { ...user, ...token }; // The return type will match the one returned in `useSession()`
    },
    async signIn({ account, profile }: any) {
      console.log("passo", account, profile);
      if (account.provider === "google") {
        return profile;
      }
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/minha-area", // (used for check email message)
  },
};

export default NextAuth(authOptions);
