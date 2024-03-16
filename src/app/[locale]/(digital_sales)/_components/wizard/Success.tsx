import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQuotePricingService } from "../../_services/QuotePricingService";

const checkedUrl = "/assets/images/check.png";

export default function Success() {
  const { email } = useQuotePricingService();
  const t = useTranslations("sales");

  return (
    <div className="flex h-full w-screen flex-col items-center justify-center">
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
            <p className="text-lg font-medium">
              {t("success_desc", { email })}
            </p>
            <div>{t("auto_redirect")}</div>
          </div>
        </HeightMotion>
      </div>
    </div>
  );
}
