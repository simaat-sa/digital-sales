import InputCode from "@/shared/components/Inputs/InputCode";
import InputMobileNumber from "@/shared/components/Inputs/InputMobileNumber";
import SocialAuth from "@/shared/components/SocialAuth";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";

export default function RegisterForm() {
  const {
    mobileNumber,
    showCode,
    code,
    errors,
    disable,
    onChange,
    _onChangeCode,
  } = useQuotePricingServiceV2();
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

      <InputMobileNumber
        value={mobileNumber}
        onChange={(e) => {
          onChange("mobileNumber", e.target.value);
        }}
        error={
          errors.mobileNumber.length
            ? validations("mobile_number_not_valid")
            : ""
        }
      />

      {showCode ? (
        <HeightMotion>
          <p className="mb-4 text-sm text-gray-600">
            {t("resend_code_notice", {
              mobileNumber: mobileNumber,
            })}
          </p>
          <InputCode
            value={code}
            onChange={(e) => {
              _onChangeCode("code", e.target.value);
            }}
            placeholder="# # # #"
            dir="ltr"
            onResendCode={() => {
              return new Promise((resolve) => {
                resolve(true);
              });
            }}
            timeLeft={59000}
            error={errors.code ? validations(errors.code as any) : ""}
            disabled={disable.code}
          />
        </HeightMotion>
      ) : null}
    </div>
  );
}
