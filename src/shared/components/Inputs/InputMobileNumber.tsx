import { countryCodes } from "@/shared/lib/countryCodes";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputMobileNumberProps extends InputProps {
  error?: string;
}

export default function InputMobileNumber({
  error,
  ...props
}: InputMobileNumberProps) {
  const t = useTranslations("sales");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-x-2">
        <Label>{t("mobile_number")}</Label>
      </div>
      <div
        className={cn(
          "flex flex-nowrap border shadow rounded bg-white ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
          {
            "border-red-600": error?.length ? true : false,
          }
        )}
        dir="ltr"
      >
        <Select value="966">
          <SelectTrigger className="max-w-[5rem] border-0 focus-visible:ring-0 rounded-none pr-0 mr-0">
            <SelectValue className="max-w-[5rem] focus-visible:outline-none focus-visible:border-0 outline-none border-0 focus:outline-none focus:border-0" />
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
            "rtl:direction-normal placeholder:rtl:text-right shadow-none border-0 rounded-none focus-visible:ring-0",
            {
              "border-red-600": error?.length ? true : false,
            }
          )}
          dir="ltr"
          type="tel"
          aria-label={t("mobile_number")}
          {...props}
        />
      </div>
      {error?.length ? (
        <p className="text-sm text-red-600 -mt-3">{error}</p>
      ) : null}
    </div>
  );
}
