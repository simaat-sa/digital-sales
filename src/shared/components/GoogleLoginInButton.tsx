import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "./ui/button";

const googleIcon = "/assets/svg/icons/google.svg";

export default function GoogleLoginInButton() {
  const { status } = useSession();
  const tc = useTranslations("common");

  return status === "unauthenticated" ? (
    <Button
      onClick={async () => {
        await signIn("google");
      }}
      variant="outline"
      className="flex h-14 w-full flex-nowrap content-baseline items-center gap-2 align-baseline"
      type="button"
    >
      <span className="text-lg">{tc("continue_with_google")}</span>
      <Image
        src={googleIcon}
        alt={tc("continue_with_google")}
        width={20}
        height={20}
        loading="lazy"
      />
    </Button>
  ) : null;
}
