import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

export default function RegisterForm() {
  const { mobileNumber, showCode, code, onChange, errors } =
    useRequestQuoteService();
  const t = useTranslations("sales");

  return (
    <HeightMotion>
      <div className="w-full flex flex-col gap-12 transition-all duration-300 delay-75">
        <div className="flex flex-col gap-4">
          <Label>{t("mobile_number")}</Label>
          <Input
            placeholder={t("mobile_number")}
            value={mobileNumber}
            onChange={(e) => {
              onChange("mobileNumber", e.target.value);
            }}
            className={cn("rtl:direction-normal", {
              "border-red-600": errors.mobileNumber.length ? true : false,
            })}
            dir="ltr"
          />
        </div>
        {showCode ? (
          <HeightMotion>
            <div className="flex flex-col gap-4">
              <Label>{t("code_otp")}</Label>
              <Input
                placeholder="# # # #"
                value={code}
                onChange={(e) => {
                  onChange("code", e.target.value);
                }}
                className="tracking-widest"
                dir="ltr"
                type="tel"
              />
              <span className="underline text-xs font-medium cursor-pointer text-gray-600 -mt-3">
                {t("resend_code")}
              </span>
            </div>
          </HeightMotion>
        ) : null}
      </div>
    </HeightMotion>
  );
}
