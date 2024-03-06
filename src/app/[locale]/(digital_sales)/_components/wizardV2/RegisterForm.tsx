import SocialAuth from "@/shared/components/SocialAuth";
import { useTranslations } from "next-intl";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";
import MobileNumberWithCode from "../MobileNumberWithCode";

export default function RegisterForm() {
  const { mobileNumber, showCode, code, errors, onChange } =
    useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <div className="flex w-full flex-col gap-12 transition-all delay-75 duration-300">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-medium">
          {t("register_main_title")}
        </h2>
        <p className="text-xl">{t("register_main_desc")}</p>
      </div>

      <SocialAuth />

      <MobileNumberWithCode
        value={mobileNumber}
        onChange={onChange}
        errors={{
          mobileNumber: errors.mobileNumber,
          code: errors.code,
        }}
        code={code}
        showCode={showCode}
      />
    </div>
  );
}
