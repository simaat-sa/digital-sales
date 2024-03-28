"use server";

import { cookies } from "next/headers";

export async function setCookieServer(name: string, value: string) {
  await cookies().set(name, value);
}
