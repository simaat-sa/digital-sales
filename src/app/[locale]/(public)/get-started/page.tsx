import Layout from "@/app/[locale]/(public)/_components/Layout";
import { redirect } from "@/shared/lib/navigation";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { RedirectType } from "next/navigation";
import GetStartedForm from "../_components/GetStartedForm";

export default async function Page() {
  const session = await getServerSession().then((val) => val?.user?.email);

  if (session) {
    redirect("/get-started/basic-info", RedirectType.replace);
  } else {
    const data = await cookies().get("data")?.value;

    return (
      <div className="min-h-layout w-full">
        <Layout hasBg isGrid>
          <GetStartedForm state={data ? JSON.parse(data) : null} />
        </Layout>
      </div>
    );
  }
}
