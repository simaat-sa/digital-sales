"use client";
import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import GoogleLoginInButton from "@/shared/components/GoogleLoginInButton";
import { useRouter } from "@/shared/lib/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";
import { ActionButton } from "./ActionButton";
import MobileNumberWithCode from "./MobileNumberWithCode";

export default function GetStartedForm({
  state,
}: {
  state: QuoteRequestModel;
}) {
  const {
    mobileNumber,
    showCode,
    code,
    errors,
    onChange,
    disable,
    country_code,
    _getCode,
    _checkCode,
    verifiedMobile,
    setState,
    storeRequestData,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");
  const router = useRouter();

  const handleSubmit = () => {
    if (!verifiedMobile && !showCode) {
      _getCode(true);
    }

    if (!verifiedMobile && showCode) {
      _checkCode();
    }

    if (verifiedMobile) {
      new Promise(async (resolve, reject) => {
        storeRequestData();
        resolve(true);
      }).then(() => {
        router.push("/get-started/basic-info");
      });
    }
  };

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [setState, state]);

  return (
    <form
      className="flex w-full flex-col gap-12 transition-all delay-75 duration-300"
      action={() => {
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4 pt-2 text-center lg:pt-3">
        <h2 className="text-lg font-medium lg:text-4xl">
          {t("register_main_title")}
        </h2>
        <p className="text-xl">{t("register_main_desc")}</p>
      </div>

      <GoogleLoginInButton />

      <MobileNumberWithCode
        value={mobileNumber}
        countryCode={country_code}
        onChange={onChange}
        errors={{
          mobileNumber: errors.mobileNumber,
          code: errors.code,
        }}
        disable={{
          code: disable.code,
        }}
        code={code}
        showCode={showCode}
      />
      <ActionButton.Root>
        <ActionButton.Submit type="submit">
          {!verifiedMobile && !showCode && t("get_code")}
          {!verifiedMobile && showCode && t("check_code")}
          {verifiedMobile && t("next")}
        </ActionButton.Submit>
      </ActionButton.Root>
    </form>
  );
}
