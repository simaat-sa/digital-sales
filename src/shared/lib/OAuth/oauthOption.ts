import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ID!;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_SECRET!;
const AUTH_NEXT_SECRET = process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET!;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: AUTH_NEXT_SECRET,
};
