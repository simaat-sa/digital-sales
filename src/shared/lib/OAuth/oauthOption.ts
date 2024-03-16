import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ID!;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_SECRET!;
const AUTH_SECRET = process.env.NEXTAUTH_SECRET!;

export const authOptions: AuthOptions = {
  secret: AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          redirect_uri:
            process.env.NODE_ENV === "production"
              ? "https://digital-sales.simaat.dev/api/auth/callback/google"
              : "http://localhost:3000/api/auth/callback/google",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
