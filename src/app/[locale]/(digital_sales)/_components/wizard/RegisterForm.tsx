import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import InputBase from "@/shared/components/Inputs/InputBase";
import InputMobileNumber from "@/shared/components/Inputs/InputMobileNumber";
import InputCode from "@/shared/components/Inputs/InputCode";

export default function RegisterForm() {
  const {
    mobileNumber,
    showCode,
    code,
    errors,
    enableReSendCode,
    onChange,
    onClickResendCode,
  } = useRequestQuoteService();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <div className="w-full flex flex-col gap-12 transition-all duration-300 delay-75">
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
          />
        </HeightMotion>
      ) : null}
    </div>
  );
}
