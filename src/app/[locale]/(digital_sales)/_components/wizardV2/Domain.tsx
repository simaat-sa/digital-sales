import InputDomain from "@/shared/components/Inputs/InputDomain";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function CheckDomain() {
  const { domain, verifiedDomain, disable, errors, onChange, onVerifyDomain } =
    useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const v = useTranslations("validations");

  return (
    <HeightMotion>
      <h3 className="mb-8 text-3xl font-medium">{t("confirm_domain_title")}</h3>
      <div className="flex flex-nowrap gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <InputDomain
            value={domain}
            onChange={(e) => onChange("domain", e.target.value)}
            domain=".simaat.sa"
            disabled={disable.domain}
            error={errors.domain ? v(errors.domain as any) : ""}
          />
        </div>
        {!verifiedDomain ? (
          <Button
            variant="outline"
            onClick={() => onVerifyDomain()}
            disabled={disable.domain}
          >
            {t("verify")}
          </Button>
        ) : (
          <Image
            src={checkedDecagramIcon}
            width={24}
            height={24}
            alt="verified"
            className="mb-3"
            loading="lazy"
          />
        )}
      </div>
    </HeightMotion>
  );
}
