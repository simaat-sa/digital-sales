import { authOptions } from "@/shared/lib/OAuth/oauthOption";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
