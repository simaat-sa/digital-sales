import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import InputBase from "@/shared/components/Inputs/InputBase";

export default function RegisterForm() {
  const { mobileNumber, showCode, code, onChange, errors } =
    useRequestQuoteService();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <HeightMotion>
      <div className="w-full flex flex-col gap-12 transition-all duration-300 delay-75">
        <InputBase
          value={mobileNumber}
          onChange={(e) => {
            onChange("mobileNumber", e.target.value);
          }}
          placeholder={t("mobile_number")}
          label={t("mobile_number")}
          error={
            errors.mobileNumber.length
              ? validations("mobile_number_not_valid")
              : ""
          }
        />

        {showCode ? (
          <HeightMotion>
            <InputBase
              value={code}
              onChange={(e) => {
                onChange("code", e.target.value);
              }}
              placeholder="# # # #"
              label={t("code_otp")}
              className="tracking-widest"
              dir="ltr"
              type="tel"
            />
          </HeightMotion>
        ) : null}
      </div>
    </HeightMotion>
  );
}
