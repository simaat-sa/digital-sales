"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";
import { ComparedData, QuoteModelV2 } from "../_services/quotesData";

const checkIcon = "/assets/svg/icons/CheckBold-blue.svg";
const LineIcon = "/assets/svg/icons/line.svg";

type ComparedPlanningProps = {
  pricingPlan: QuoteModelV2[];
  comparedData: ComparedData[];
};

export default function ComparePlanning({
  pricingPlan,
  comparedData,
}: ComparedPlanningProps) {
  const t = useTranslations("sales");
  const tv2 = useTranslations("v2.sales");
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const filler = useRef<HTMLDivElement>(null);
  const { handleSubmitSelectPlan } = useQuotePricingServiceV2();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", (e) => {
        if (filler.current?.offsetTop) {
          setHasScrolled(true);
        } else {
          setHasScrolled(false);
        }
      });
    }
  }, [hasScrolled]);

  return (
    <div className="relative w-full min-w-[50em]">
      <div
        className="sticky top-0 z-10 flex w-full flex-nowrap bg-white text-center font-medium"
        ref={filler}
      >
        {hasScrolled ? (
          <>
            <div className="flex w-2/5 items-center justify-center border">
              {t("addons")}
            </div>
            {pricingPlan.map((plan) => (
              <div
                className="flex w-1/5 flex-col items-center justify-center gap-2 border py-4"
                key={plan.id}
              >
                <span className="text-lg">{t(plan.name as any)}</span>
                <Button
                  type="button"
                  onClick={() => {
                    handleSubmitSelectPlan(plan.id).then(() => {
                      router.push("/get-started/custom-plan", {
                        scroll: true,
                      });
                    });
                  }}
                >
                  {tv2("custom_your_quote")}
                </Button>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Table className="my-12 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="h-16 text-left rtl:text-right">
              {t("addons")}
            </TableHead>
            {pricingPlan.map((plan) => (
              <TableHead key={plan.id} className="h-16 text-center">
                {t(plan.name as any)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparedData.map((feature, index) => (
            <TableRow key={feature.id} className="h-16 w-full">
              <TableCell className="w-2/5 font-medium">
                {feature.name.ar}
              </TableCell>

              {pricingPlan.map((p, i) => {
                let feat = feature.plan.find((f) => f.planId === p.id);

                return (
                  <TableCell key={index + i} className="w-1/5 text-center">
                    {feat?.value ? (
                      feat.value
                    ) : feat?.checked ? (
                      <Image
                        src={checkIcon}
                        alt="checked"
                        width={28}
                        height={28}
                        className="mx-auto"
                      />
                    ) : (
                      <Image
                        src={LineIcon}
                        alt="checked"
                        width={28}
                        height={28}
                        className="mx-auto"
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}