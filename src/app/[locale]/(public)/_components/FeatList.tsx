"use client";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment, useState } from "react";
import { QuoteModelV2 } from "../_services/quotesData";

const checkedIcon = "/assets/svg/icons/CheckBold-blue.svg";

export default function FeatList({
  quote,
  isSpeared,
  isGradient,
}: {
  quote?: QuoteModelV2;
  isSpeared: boolean;
  isGradient?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const tv2 = useTranslations("v2.sales");

  return (
    <>
      <ul
        className={cn("relative h-auto list-none mb-4", {
          "gradient-black-to-transparent max-h-32 overflow-hidden bg-gray-200":
            !open && isGradient,
        })}
      >
        {quote?.features.map((feat, index) => (
          <Fragment key={index}>
            {feat.data.map((item, i) => (
              <Fragment key={i}>
                <li
                  key={index}
                  className={cn("mb-3", {
                    "mb-0": feat.data.length - 1 === i && isSpeared,
                  })}
                >
                  <div className="flex flex-nowrap items-center gap-x-2">
                    <Image
                      src={checkedIcon}
                      alt={"checked"}
                      width={24}
                      height={24}
                    />
                    <Label className="text-lg font-medium">{item}</Label>
                  </div>
                </li>
                {isSpeared &&
                feat.data.length - 1 === i &&
                quote.features.length - 1 !== index ? (
                  <Separator className="my-6" />
                ) : null}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </ul>
      {isGradient && (
        <div className="text-left">
          <Button
            variant="link"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            size="sm"
          >
            {open ? tv2("show_less") : tv2("show_more")}
          </Button>
        </div>
      )}
    </>
  );
}
