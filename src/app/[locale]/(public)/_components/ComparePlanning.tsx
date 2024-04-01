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
import { cn } from "@/shared/lib/utils";
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
  const tc = useTranslations("common");
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
    <div className="w-full overflow-hidden md:overflow-visible">
      <div className="w-full overflow-x-auto md:overflow-visible">
        <div className="relative min-w-[50em]">
          <div
            className="sticky top-0 z-10 flex w-full flex-nowrap bg-white text-center font-medium"
            ref={filler}
          >
            {hasScrolled ? (
              <>
                <div className="flex w-2/5 items-center justify-center border">
                  {tv2("basic_addons")}
                </div>
                {pricingPlan.map((plan, i) => (
                  <div
                    className={cn(
                      "flex w-1/5 flex-col items-center justify-center gap-2 border py-3",
                      {
                        "rounded-tl-sm rounded-tr-sm border-t-[6px] border-x-primary-600 border-t-primary-600":
                          i === 1,
                      },
                    )}
                    key={plan.id}
                  >
                    <span className="text-xl">{t(plan.name as any)}</span>
                    <div>
                      <span className="mx-1 text-2xl">{plan.price}</span>
                      <span>{t("s_r_monthly")}</span>
                    </div>
                    <Button
                      type="button"
                      className="inline-flex items-center gap-x-1"
                      onClick={() => {
                        handleSubmitSelectPlan(plan.id).then(() => {
                          router.push("/get-started/custom-plan", {
                            scroll: true,
                          });
                        });
                      }}
                    >
                      <span>{tv2("custom_your_quote")}</span>
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
                  {tv2("basic_addons")}
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
      </div>
    </div>
  );
}
