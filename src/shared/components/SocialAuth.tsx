import { useQuotePricingServiceV2 } from "@/app/[locale]/(digital_sales)/_services/QuotePricingServiceV2";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "./ui/button";

export default function SocialAuth() {
  const { status, data: user } = useSession();
  const {
    _setCurrentWizard,
    _onUpdateWizardHistory,
    onChange,
    onLoginWithGoogle,
  } = useQuotePricingServiceV2();

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
          className="w-full"
        >
          Google
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
