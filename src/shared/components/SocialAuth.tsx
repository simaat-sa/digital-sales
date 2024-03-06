import { useQuotePricingServiceV2 } from "@/app/[locale]/(digital_sales)/_services/QuotePricingServiceV2";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "./ui/button";

const googleIcon = "/assets/svg/icons/google.svg";

export default function SocialAuth() {
  const { status, data: user } = useSession();
  const tc = useTranslations("common");

  const { _setCurrentWizard, _onUpdateWizardHistory, onLoginWithGoogle } =
    useQuotePricingServiceV2();

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
    <>
      {status === "unauthenticated" ? (
        <Button
          onClick={async () => {
            await signIn("google");
          }}
          variant="outline"
          className="flex h-14 w-full flex-nowrap content-baseline items-center gap-2 align-baseline"
        >
          <span className="text-base">{tc("continue_with_google")}</span>
          <Image
            src={googleIcon}
            alt={tc("continue_with_google")}
            width={20}
            height={20}
            loading="lazy"
          />
        </Button>
      ) : (
        <div className="flex flex-col gap-4">
          <span>Hi, {user?.user?.name}</span>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
}
