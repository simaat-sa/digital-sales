import InputCode from "@/shared/components/Inputs/InputCode";
import InputMobileNumber from "@/shared/components/Inputs/InputMobileNumber";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import { useQuotePricingService } from "../../_services/QuotePricingService";

export default function RegisterForm() {
  const {
    mobileNumber,
    showCode,
    code,
    errors,
    disable,
    onChange,
    _onChangeCode,
  } = useQuotePricingService();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <div className="w-full flex flex-col gap-12 transition-all duration-300 delay-75">
      <div className="text-center">
        <h2 className="text-4xl font-semibold mb-4">
          {t("register_main_title")}
        </h2>
        <p className="text-xl">{t("register_main_desc")}</p>
      </div>
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
          <p className="text-sm text-gray-600 mb-4">
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
