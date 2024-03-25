"use client";
import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import InputBase from "@/shared/components/Inputs/InputBase";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Label } from "@/shared/components/ui/label";
import { useRouter } from "@/shared/lib/navigation";
import { cn } from "@/shared/lib/utils";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";
import { quotesDataV2 } from "../_services/quotesData";
import { ActionButton } from "./ActionButton";
import MobileNumberWithCode from "./MobileNumberWithCode";

const exitIcon = "/assets/svg/icons/ExitLine.svg";

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

export default function BasicInfoForm({
  state,
}: {
  state: QuoteRequestModel | null;
}) {
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
    signOut,
    country_code,
    setState,
    handleSubmitBasicInfo,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");
  const tv2 = useTranslations("v2.sales");
  const tc = useTranslations("common");
  const validations = useTranslations("validations");
  const { status, data: user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [setState, state]);

  return (
    <HeightMotion>
      <form
        className="flex flex-col gap-4 lg:gap-6"
        action={() =>
          handleSubmitBasicInfo().then(() =>
            router.push("/get-started/pricing-plan"),
          )
        }
      >
        <h3 className="mt-4 text-xl font-medium lg:mt-2 lg:text-3xl">
          {t("tell_us_about_yourSelf")}
        </h3>
        {status === "authenticated" ? (
          <div className="flex w-full justify-between rounded-md bg-slate-200 px-2 py-2">
            <div>
              <span className="block">{tv2("logged_with")}</span>
              <span>{user?.user?.name || ""}</span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Image
                  src={exitIcon}
                  alt={"exit"}
                  width={24}
                  height={24}
                  loading="lazy"
                  className="rotate-180"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{tv2("dialog_title")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {tv2("dialog_desc")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel>{tc("close")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      signOut().then(async () => {
                        router.push("/get-started");
                      });
                    }}
                  >
                    {tc("Confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
        <div className="flex w-full flex-col gap-4">
          <Label>{t("business_needed")}</Label>

          <div className="inline-flex h-16 w-full items-center justify-center overflow-hidden rounded-full border bg-muted p-1 text-muted-foreground">
            {quotesDataV2.map(({ id, business_need_label }) => (
              <div
                className={cn(
                  "inline-flex h-full flex-auto cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-3 py-1.5 text-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm lg:flex-1 ltr:text-base",
                )}
                data-state={quotePlan === String(id) ? "active" : ""}
                key={id}
                onClick={() => {
                  onChange("quotePlan", String(id));
                }}
              >
                {t(business_need_label as any)}
              </div>
            ))}
          </div>
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

        {status === "authenticated" ? (
          <MobileNumberWithCode
            value={mobileNumber}
            countryCode={country_code}
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

        <ActionButton.Root>
          <ActionButton.Submit type="submit">
            {!showCode && status === "authenticated"
              ? t("get_code")
              : !verifiedMobile
                ? t("check_code")
                : t("next")}
          </ActionButton.Submit>
          <div className="font-medium">
            {tv2("steps_number", { pageNumber: 2 })}
          </div>
        </ActionButton.Root>
      </form>
    </HeightMotion>
  );
}
