import InputBase from "@/shared/components/Inputs/InputBase";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Label } from "@/shared/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useTranslations } from "next-intl";
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
    registerWay,
  } = useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const validations = useTranslations("validations");

  return (
    <HeightMotion>
      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-medium">{t("tell_us_about_yourSelf")}</h3>
        <div className="flex w-full flex-col gap-4">
          <Label>{t("business_needed")}</Label>

          <Tabs
            className="w-full"
            value={quotePlan}
            onValueChange={(e) => {
              onChange("quotePlan", String(e));
            }}
          >
            <TabsList className="h-16 w-full overflow-hidden rounded-full">
              {quotesData.map(({ id, business_need_label }) => (
                <TabsTrigger
                  value={String(id)}
                  key={id}
                  className="h-full flex-1 overflow-hidden rounded-full"
                >
                  {t(business_need_label as any)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {errors.quotePlan.length ? (
            <p className="-mt-4 text-lg text-red-600">
              {validations("quote_type_is_required")}
            </p>
          ) : null}
        </div>
        <HeightMotion>
          <InputName />
        </HeightMotion>

        {registerWay === "MobileNumber" ? (
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
        ) : null}

        {registerWay === "SocialMedia" ? (
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
            verified={verifiedMobile}
          />
        ) : null}
      </div>
    </HeightMotion>
  );
}
