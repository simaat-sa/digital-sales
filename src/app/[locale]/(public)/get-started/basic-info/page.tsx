import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import { redirect } from "@/shared/lib/navigation";
import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import BasicInfoForm from "../../_components/BasicInfoForm";
import LayoutGrid from "../../_components/Layout";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "sales" });

  return {
    title: t("tell_us_about_yourSelf"),
    description: t("tell_us_about_yourSelf"),
  };
}

export default async function Page() {
  const data =  cookies().get("data")?.value;
  const parsed = data ? (JSON.parse(data) as QuoteRequestModel) : null;
  const session = await getServerSession().then((s) => s?.user?.email);

  if (!parsed?.mobileNumberVerified && !session) {
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
