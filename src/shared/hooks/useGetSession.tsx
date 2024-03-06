import { getServerSession } from "next-auth";
import { authOptions } from "../lib/OAuth/oauthOption";

export default async function useGetSession() {
  const session = await getServerSession(authOptions);
  return session;
}
