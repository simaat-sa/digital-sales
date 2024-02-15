import React, { useState } from "react";
import { Input, InputProps } from "../ui/input";
import { useTranslations } from "next-intl";
import Countdown from "react-countdown";

interface InputCodeProps extends InputProps {
  timeLeft: number;
  onResendCode: () => Promise<boolean>;
}

export default function InputCode({
  timeLeft,
  onResendCode,
  ...props
}: InputCodeProps) {
  const [resendCode, setResendCode] = useState<boolean>(true);

  const c = useTranslations("common");

  return (
    <div className="flex flex-col gap-3">
      <Input {...props} />
      <div>
        <Countdown
          date={Date.now() + timeLeft}
          renderer={({ seconds, completed, api }) => {
            if (completed || resendCode) {
              return (
                <span
                  className="underline text-sm cursor-pointer"
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
      </div>
    </div>
  );
}
