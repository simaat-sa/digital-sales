"use client";
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
  const [resendCode, setResendCode] = useState<boolean>(false);

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
          <p className="-mt-3 text-lg text-red-600">{error}</p>
        ) : null}
      </div>
      {!props.disabled ? (
        <Countdown
          date={Date.now() + timeLeft}
          renderer={({ seconds, api }) => {
            if (resendCode) {
              return (
                <span
                  className="mt-2 cursor-pointer text-lg text-secondaryblue hover:text-primary"
                  onClick={() => {
                    api.start();
                    setResendCode(false);
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
          autoStart={true}
        />
      ) : null}
    </div>
  );
}
