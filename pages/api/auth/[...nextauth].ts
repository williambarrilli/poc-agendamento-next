import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.NEXT_PUBLIC_G_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_G_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_G_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + "/minha-area";
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error", // Error code passed in query string as ?error=
    // verifyRequest: "/minha-area", // (used for check email message)
  },
};

export default NextAuth(authOptions);
