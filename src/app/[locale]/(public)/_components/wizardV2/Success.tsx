"use client";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

const checkedUrl = "/assets/images/check.png";
export default function Success() {
  const { email, resetV2 } = useQuotePricingServiceV2();
  const t = useTranslations("sales");

  useEffect(() => {
    setTimeout(() => {
      resetV2();
    }, 3000);
  }, [resetV2]);

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
            <p className="pb-2 text-xl font-medium">{email}</p>
            <div>{t("auto_redirect")}</div>
          </div>
        </HeightMotion>
      </div>
    </div>
  );
}
