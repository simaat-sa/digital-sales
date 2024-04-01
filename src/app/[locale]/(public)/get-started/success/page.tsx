"use client";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Locale } from "@/shared/types/locale";
import Cookies from "js-cookie";
import { Metadata } from "next";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

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
  const { email, resetV2 } = useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    async function clearData() {
      if (status === "authenticated") {
        await signOut({
          redirect: false,
        });
      }
      setTimeout(async () => {
        await Cookies.remove("data");
        await resetV2();
        router.push("/get-started", {
          scroll: true,
        });
      }, 5000);
    }

    clearData();
  }, [resetV2, router, status]);

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
        <HeightMotion>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-medium">{t("success_title")}</h2>
            <p className="pt-3 text-lg font-medium">
              {t("success_desc", { email })}
            </p>
            <p className="pb-2 text-xl font-medium text-secondaryblue">
              {email}
            </p>
            <div>{t("auto_redirect")}</div>
          </div>
        </HeightMotion>
      </div>
    </div>
  );
}
