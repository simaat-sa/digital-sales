import { Label } from "@/shared/components/ui/label";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuoteService";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import InputPassword from "@/shared/components/Inputs/InputPassword";
import InputDomain from "@/shared/components/Inputs/InputDomain";
import { useTranslations } from "next-intl";

export default function CheckDomain() {
  const { onChange, domain } = useRequestQuoteService();
  const t = useTranslations("sales");

  return (
    <HeightMotion>
      <div className="flex flex-nowrap gap-4 items-end">
        <div className="flex-1 flex flex-col gap-4">
          <InputDomain
            value={domain}
            onChange={(val) => onChange("domain", val)}
            domain=".simaat.app"
          />
        </div>
        <Button variant="outline">{t("check")}</Button>
      </div>
    </HeightMotion>
  );
}
