import { countryCodes } from "@/shared/lib/countryCodes";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

interface InputMobileNumberProps extends InputProps {
  error?: string;
  verified?: boolean;
}

export default function InputMobileNumber({
  error,
  verified,
  ...props
}: InputMobileNumberProps) {
  const t = useTranslations("sales");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-x-2">
        <Label>{t("mobile_number")}</Label>
      </div>
      <div
        className={cn(
          "flex flex-nowrap overflow-hidden rounded-lg border bg-white ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border-red-600": error?.length ? true : false,
          },
        )}
        dir="ltr"
      >
        <Select value="966" disabled={props.disabled}>
          <SelectTrigger className="my-auto mr-0 h-full max-w-[5rem] rounded-none border-0 pr-0 focus-visible:ring-0">
            <SelectValue
              className="max-w-[5rem] border-0 py-3 outline-none focus:border-0 focus:outline-none focus-visible:border-0 focus-visible:outline-none"
              tabIndex={1}
            />
          </SelectTrigger>
          <SelectContent className="w-auto">
            {countryCodes.map((code) => (
              <SelectItem value={code.code} key={code.code}>
                +{code.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder={t("mobile_number")}
          value={props.value}
          onChange={props.onChange}
          className={cn(
            "rounded-none border-0 shadow-none focus-visible:ring-0 rtl:direction-normal placeholder:rtl:text-right",
            {
              "border-red-600": error?.length ? true : false,
            },
          )}
          dir="ltr"
          type="tel"
          aria-label={t("mobile_number")}
          tabIndex={0}
          {...props}
        />
        {verified && (
          <Image
            src={checkedDecagramIcon}
            width={24}
            height={24}
            alt="verified"
            className="m-2"
            loading="lazy"
          />
        )}
      </div>
      {error?.length ? (
        <p className="-mt-3 text-lg text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
