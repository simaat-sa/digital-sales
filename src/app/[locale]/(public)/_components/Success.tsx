"use client";

import HeightMotion from "@/shared/components/motions/HeighEffect";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";

export default function Success() {
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

      setTimeout(() => {
        Cookies.remove("data");
        resetV2();
        router.push("/get-started", {
          scroll: true,
        });
      }, 5000);
    }

    clearData().then(() => {});
  }, [resetV2, router, status]);

  return (
    <HeightMotion>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-medium">{t("success_title")}</h2>
        <p className="pt-3 text-lg font-medium">
          {t("success_desc")}
        </p>
        <p className="pb-2 text-xl font-medium text-secondaryblue">{email}</p>
        <div>{t("auto_redirect")}</div>
      </div>
    </HeightMotion>
  );
}
