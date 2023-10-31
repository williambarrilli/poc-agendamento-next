export interface Session {
  accessToken: string;
  accessTokenExpires: number;
  account: {
    provider: string;
    type: string;
    providerAccountId: string;
    access_token: string;
    expires_at: number;
  };
  exp: number;

  iat: number;
  jti: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
  status: "authenticated" | "unauthenticated" | "loading";
}
