import InputCode from "@/shared/components/Inputs/InputCode";
import InputMobileNumber from "@/shared/components/Inputs/InputMobileNumber";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import { FieldName } from "../_services/QuotePricingService";

interface MobileNumberWithCodeProps {
  value: string;
  code: string;
  errors?: {
    mobileNumber?: string;
    code?: string;
  };
  disable?: {
    mobileNumber?: boolean;
    code?: boolean;
  };
  showCode: boolean;
  verified?: boolean;
  countryCode: number;
  onChange: (name: FieldName, value: string) => void;
}

export default function MobileNumberWithCode({
  value,
  code,
  errors,
  disable,
  showCode,
  verified,
  countryCode,
  onChange,
}: MobileNumberWithCodeProps) {
  console.log("🚀 ~ countryCode:", countryCode);
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <>
      <InputMobileNumber
        value={value}
        onChange={(e) => {
          onChange("mobileNumber", e.target.value);
        }}
        error={
          errors?.mobileNumber?.length
            ? validations("mobile_number_not_valid")
            : ""
        }
        disabled={disable?.mobileNumber}
        verified={verified}
      />

      {showCode ? (
        <HeightMotion>
          <p className="mb-4 text-lg text-gray-600">
            {t("resend_code_notice", {
              mobileNumber: `${countryCode}${value}`,
            })}
          </p>
          <InputCode
            value={code}
            onChange={(e) => {
              onChange("code", e.target.value);
            }}
            placeholder="# # # #"
            dir="ltr"
            onResendCode={() => {
              return new Promise((resolve) => {
                resolve(true);
              });
            }}
            timeLeft={59000}
            error={errors?.code ? validations(errors?.code as any) : ""}
            disabled={disable?.code}
          />
        </HeightMotion>
      ) : null}
    </>
  );
}
