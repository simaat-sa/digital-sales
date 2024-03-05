import { getServerSession } from "next-auth";
import { authOptions } from "../lib/OAuthProviders";

export default async function useGetSession() {
  const session = await getServerSession(authOptions);
  return session;
}
