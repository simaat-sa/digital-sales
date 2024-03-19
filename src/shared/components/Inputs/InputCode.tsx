import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Countdown from "react-countdown";
import { Input, InputProps } from "../ui/input";

interface InputCodeProps extends InputProps {
  timeLeft: number;
  onResendCode: () => Promise<boolean>;
  error?: string;
}

export default function InputCode({
  timeLeft,
  onResendCode,
  error,
  ...props
}: InputCodeProps) {
  const [resendCode, setResendCode] = useState<boolean>(true);

  const c = useTranslations("common");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <Input
          className={cn({
            "border-red-600": error?.length ? true : false,
          })}
          {...props}
        />
        {error?.length ? (
          <p className="text-lg text-red-600 -mt-3">{error}</p>
        ) : null}
      </div>
      {!props.disabled ? (
        <Countdown
          date={Date.now() + timeLeft}
          renderer={({ seconds, completed, api }) => {
            if (completed || resendCode) {
              return (
                <span
                  className="text-secondaryblue text-lg cursor-pointer mt-2 hover:text-primary"
                  onClick={() => {
                    onResendCode().then(() => {
                      api.start();
                      setResendCode(false);
                    });
                  }}
                >
                  {c("resend_code")}
                </span>
              );
            }

            if (api.isCompleted()) {
              setResendCode(true);
            }

            if (api.isStarted()) {
              return (
                <span>
                  {c("countdown", {
                    time: seconds,
                  })}
                </span>
              );
            }
          }}
          autoStart={false}
        />
      ) : null}
    </div>
  );
}
