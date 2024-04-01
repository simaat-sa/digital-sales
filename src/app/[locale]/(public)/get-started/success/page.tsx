import { Locale } from "@/shared/types/locale";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Success from "../../_components/Success";

const checkedUrl = "/assets/images/check.png";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "sales" });

  return {
    title: t("success_title"),
    description: t("success_title"),
  };
}

export default function Page() {
  return (
    <div className="min-h-layout container flex items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <Image
          src={checkedUrl}
          alt="successfully"
          width={140}
          height={270}
          loading="lazy"
        />
        <Success />
      </div>
    </div>
  );
}
