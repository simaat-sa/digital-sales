import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useLocale, useTranslations } from "next-intl";
import { quotesData } from "../../_services/quotesData";
import { cn } from "@/shared/lib/utils";
import InputBase from "@/shared/components/Inputs/InputBase";

export default function RequirementForm() {
  const { quotePlan, email, onChange, errors } = useRequestQuoteService();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");
  const locale = useLocale();

  return (
    <HeightMotion>
      <div className="flex flex-col gap-4 mb-4">
        <Label>{t("business_type")}</Label>
        <Select
          onValueChange={(value) => onChange("quotePlan", value)}
          value={quotePlan || "1"}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <SelectTrigger
            className={cn("w-full", {
              "border-red-600": errors.quotePlan.length ? true : false,
            })}
          >
            <SelectValue placeholder={t("quote_type")} />
          </SelectTrigger>
          <SelectContent>
            {quotesData.map(({ id, name }) => (
              <SelectItem
                value={String(id)}
                onChange={() => onChange("quotePlan", id)}
                key={String(id)}
              >
                {t(name as any)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.quotePlan.length ? (
          <p className="text-sm text-red-600 -mt-4">
            {validations("quote_type_is_required")}
          </p>
        ) : null}
      </div>
      <InputBase
        value={email}
        onChange={(e) => {
          onChange("email", e.target.value);
        }}
        placeholder={t("email")}
        label={t("email")}
        hintLabel={`(${t("optional")})`}
        error={errors.email.length ? validations("email_not_valid") : ""}
        type="email"
        dir="ltr"
      />
    </HeightMotion>
  );
}
