import { Input } from "@/shared/components/ui/input";
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

export default function RequirementForm() {
  const { quotePlan, email, onChange, errors } = useRequestQuoteService();
  const t = useTranslations("sales");
  const locale = useLocale();

  return (
    <HeightMotion>
      <div className="flex flex-col gap-4">
        <Label>{t("quote_type")}</Label>
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
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between gap-x-4">
          <Label>{t("email")}</Label>
          <Label className="text-xs text-slate-600 lowercase">
            ({t("optional")})
          </Label>
        </div>
        <Input
          placeholder={t("email")}
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => {
            onChange("email", e.target.value);
          }}
          className={cn({
            "border-red-600": errors.email.length ? true : false,
          })}
        />
      </div>
    </HeightMotion>
  );
}
