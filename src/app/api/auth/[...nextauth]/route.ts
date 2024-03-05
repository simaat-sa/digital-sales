import { authOptions } from "@/shared/lib/oauth/AuthProviders";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
