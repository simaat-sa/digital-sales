import { getServerSession } from "next-auth/next";
import { authOptions } from "./AuthProviders";

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = (): Promise<{
  name: string;
  email: string;
}> => {
  return new Promise(async function (resolve, reject) {
    const user = await getServerSession(authOptions);
    if (user?.user) {
      resolve({
        name: user.user.name!,
        email: user.user.email!,
      });
    } else {
      reject(null);
    }
  });
};
