import InputBase from "@/shared/components/Inputs/InputBase";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";
import { quotesData } from "../../_services/quotesData";
import MobileNumberWithCode from "../MobileNumberWithCode";

function InputName() {
  const {
    quotePlan,
    email,
    firstName,
    lastName,
    organizeName,
    errors,
    onChange,
  } = useQuotePricingServiceV2();
  const validations = useTranslations("validations");
  const t = useTranslations("sales");

  switch (quotePlan) {
    case "1":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <InputBase
              value={firstName}
              onChange={(e) => {
                onChange("firstName", e.target.value);
              }}
              placeholder={t("firstName")}
              label={t("firstName")}
              error={
                errors.firstName.length
                  ? validations(errors.firstName as any)
                  : ""
              }
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <InputBase
              value={lastName}
              onChange={(e) => {
                onChange("lastName", e.target.value);
              }}
              placeholder={t("lastName")}
              label={t("lastName")}
              error={
                errors.lastName.length
                  ? validations(errors.lastName as any)
                  : ""
              }
            />
          </div>
        </div>
      );

    case "2":
      return (
        <InputBase
          value={organizeName}
          onChange={(e) => {
            onChange("organizeName", e.target.value);
          }}
          placeholder={t("office_name")}
          label={t("office_name")}
          error={
            errors.organizeName.length
              ? validations(errors.organizeName as any)
              : ""
          }
        />
      );

    case "3":
      return (
        <InputBase
          value={organizeName}
          onChange={(e) => {
            onChange("organizeName", e.target.value);
          }}
          placeholder={t("company_name")}
          label={t("company_name")}
          error={
            errors.organizeName.length
              ? validations(errors.organizeName as any)
              : ""
          }
        />
      );
    default:
      return <></>;
  }
}

export default function RequirementForm() {
  const {
    quotePlan,
    email,
    errors,
    onChange,
    verifiedEmail,
    verifiedMobile,
    mobileNumber,
    code,
    showCode,
    disable,
  } = useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");
  const locale = useLocale();

  return (
    <HeightMotion>
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-medium">{t("personal_info")}</h3>
        <div className="flex flex-col gap-4">
          <Label>{t("business_needed")}</Label>
          <Select
            onValueChange={(value) => onChange("quotePlan", value)}
            value={quotePlan}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <SelectTrigger
              className={cn("w-full", {
                "border-red-600": errors.quotePlan.length ? true : false,
              })}
            >
              <SelectValue placeholder={t("business_needed")} />
            </SelectTrigger>
            <SelectContent>
              {quotesData.map(({ id, business_need_label }) => (
                <SelectItem
                  value={String(id)}
                  onChange={() => onChange("quotePlan", id)}
                  key={String(id)}
                >
                  {t(business_need_label as any)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.quotePlan.length ? (
            <p className="-mt-4 text-sm text-red-600">
              {validations("quote_type_is_required")}
            </p>
          ) : null}
        </div>
        <HeightMotion>
          <InputName />
        </HeightMotion>
        <InputBase
          value={email}
          onChange={(e) => {
            onChange("email", e.target.value);
          }}
          placeholder={t("email")}
          label={t("email")}
          error={errors.email.length ? validations("email_not_valid") : ""}
          type="email"
          dir="ltr"
          className="placeholder:rtl:text-right"
          disabled={verifiedEmail ? true : disable.email}
        />

        <MobileNumberWithCode
          value={mobileNumber}
          onChange={onChange}
          errors={{
            mobileNumber: errors.mobileNumber,
            code: errors.code,
          }}
          code={code}
          showCode={verifiedMobile ? false : showCode}
          disable={{
            mobileNumber: verifiedMobile ? true : disable.mobileNumber,
            code: disable.code,
          }}
        />
      </div>
    </HeightMotion>
  );
}
