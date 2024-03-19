import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Fragment } from "react";
import { QuoteModelV2 } from "../../_services/quotesData";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

export default function FeatList({
  quote,
  isSpeared,
}: {
  quote?: QuoteModelV2;
  isSpeared: boolean;
}) {
  return (
    <ul className="list-none">
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
                <div className="flex flex-nowrap items-center gap-x-3">
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
                <Separator className="my-3 h-8 bg-slate-50" />
              ) : null}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </ul>
  );
}
