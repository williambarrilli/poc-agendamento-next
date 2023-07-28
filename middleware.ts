import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/error",
  },
  secret: process.env.NEXT_PUBLIC_G_SECRET,

  callbacks: {
    authorized({ req, token }: { req: any; token: any }) {
      return token?.accessToken;
    },
  },
});

export const config = {
  matcher: ["/minha-area"],
};
