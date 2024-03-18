import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

const checkedUrl = "/assets/images/check.png";
export default function Success() {
  const { email } = useQuotePricingServiceV2();
  const t = useTranslations("sales");

  return (
    <div className="min-h-layout flex flex-col items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
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
            <p className="text-lg font-medium pt-3">
            {t("success_desc", { email })}
            </p>
            <p className="text-xl font-medium pb-2">
              { email }
            </p>
            <div>{t("auto_redirect")}</div>
          </div>
        </HeightMotion>
      </div>
    </div>
  );
}
