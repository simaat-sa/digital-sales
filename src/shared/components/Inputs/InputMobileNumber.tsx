import React from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface InputMobileNumberProps extends InputProps {
  error?: string;
}

export default function InputMobileNumber({
  ...props
}: InputMobileNumberProps) {
  const t = useTranslations("sales");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-x-2">
        <Label>{t("mobile_number")}</Label>
      </div>
      <Input
        placeholder={t("mobile_number")}
        value={props.value}
        onChange={props.onChange}
        className={cn("rtl:direction-normal placeholder:rtl:text-right", {
          "border-red-600": props.error?.length ? true : false,
        })}
        {...props}
      />
      {props.error?.length ? (
        <p className="text-sm text-red-600 -mt-4">{props.error}</p>
      ) : null}
    </div>
  );
}
