"use client";
import GoogleLoginInButton from "@/shared/components/GoogleLoginInButton";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";
import MobileNumberWithCode from "../MobileNumberWithCode";

export default function RegisterForm() {
  const {
    mobileNumber,
    showCode,
    code,
    errors,
    onChange,
    disable,
    country_code,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");
  const { _setCurrentWizard, _onUpdateWizardHistory, onLoginWithGoogle } =
    useQuotePricingServiceV2();
  const { status, data: user } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      _setCurrentWizard("requirements");
      _onUpdateWizardHistory("register");
      onLoginWithGoogle(user?.user?.email || "");
    }
  }, [
    _onUpdateWizardHistory,
    _setCurrentWizard,
    onLoginWithGoogle,
    status,
    user?.user?.email,
  ]);

  return (
    <div className="flex w-full flex-col gap-12 transition-all delay-75 duration-300">
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
    </div>
  );
}