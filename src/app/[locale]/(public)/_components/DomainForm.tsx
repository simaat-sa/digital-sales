"use client";
import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import InputDomain from "@/shared/components/Inputs/InputDomain";
import HeightMotion from "@/shared/components/motions/HeighEffect";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "@/shared/lib/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";
import { ActionButton } from "./ActionButton";

const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function DomainForm({ state }: { state: QuoteRequestModel }) {
  const {
    domain,
    verifiedDomain,
    disable,
    errors,
    onChange,
    onVerifyDomain,
    setState,
    handleSubmitDomain,
  } = useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const tv2 = useTranslations("v2.sales");
  const v = useTranslations("validations");
  const router = useRouter();

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [setState, state]);

  return (
    <HeightMotion>
      <div className="mb-8">
        <h3 className="inline-flex text-3xl font-medium">
          {t("confirm_domain_title")}
        </h3>
        <span className="mx-3">{tv2("steps_number", { pageNumber: 4 })}</span>
      </div>
      <form
        className="mb-4 flex flex-nowrap gap-4"
        action={() => onVerifyDomain()}
      >
        <div className="flex flex-1 flex-col gap-4">
          <InputDomain
            value={domain}
            onChange={(e) => onChange("domain", e.target.value)}
            domain=".simaat.sa"
            disabled={disable.domain}
            error={errors.domain ? v(errors.domain as any) : ""}
          />
        </div>
        {!verifiedDomain ? (
          <Button variant="outline" disabled={disable.domain} type="submit">
            {t("verify")}
          </Button>
        ) : (
          <Image
            src={checkedDecagramIcon}
            width={24}
            height={24}
            alt="verified"
            className="mb-3"
            loading="lazy"
          />
        )}
      </form>
      <ActionButton.Root>
        <ActionButton.Submit
          type="button"
          disabled={!verifiedDomain}
          onClick={() =>
            handleSubmitDomain().then(() =>
              router.push("/get-started/summary-invoice", { scroll: true }),
            )
          }
        >
          {t("next")}
        </ActionButton.Submit>
        <ActionButton.Back>{t("back")}</ActionButton.Back>
      </ActionButton.Root>
    </HeightMotion>
  );
}
