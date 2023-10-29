import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    accessTokenExpires: number;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    account: {
      provider: string;
      type: string;
      providerAccountId: string;
      access_token: string;
      expires_at: number;
      scope: string;
      token_type: string;
      id_token: string;
    };
    iat: number;
    exp: number;
    jti: string;
  }
}
