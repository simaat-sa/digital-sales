import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import { redirect } from "@/shared/lib/navigation";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import BasicInfoForm from "../../_components/BasicInfoForm";
import LayoutGrid from "../../_components/Layout";

export default async function Page() {
  const data = await cookies().get("data")?.value;
  const parsed = data ? (JSON.parse(data) as QuoteRequestModel) : null;
  const session = await getServerSession().then((s) => s?.user?.email);

  if (!parsed?.mobileNumberVerified && typeof session !== "string") {
    return redirect("/");
  }

  return (
    <div className="min-h-layout w-full">
      <LayoutGrid hasBg isGrid>
        <BasicInfoForm state={parsed} />
      </LayoutGrid>
    </div>
  );
}
