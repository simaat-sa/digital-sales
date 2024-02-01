import React from "react";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/components/ui/checkbox";
import Image from "next/image";
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { useRequestQuoteService } from "../../_services/requestQuote";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

export default function Quotes() {
  const { quotePlan, onTakeAction } = useRequestQuoteService();

  return (
    <div className="w-full h-screen grid grid-cols-3 items-center gap-6 py-8">
      {(["personal", "office", "company"] as (typeof quotePlan)[]).map(
        (quote) => (
          <div
            className={cn(
              "flex flex-col gap-y-3 shadow-md rounded-3xl overflow-hidden transition-colors duration-150 bg-white p-4",
              {
                "bg-gradient-to-r from-slate-200 to-gray-100 shadow-lg":
                  quote === quotePlan,
              }
            )}
            key={quote}
          >
            <div className="w-full flex flex-col justify-center gap-8 min-h-40">
              <div className="flex flex-nowrap items-center gap-x-4">
                <h4 className="font-bold text-2xl">{quote}</h4>
                {quote === quotePlan ? (
                  <span className="text-xs border rounded-md shadow p-2">
                    Best matching
                  </span>
                ) : null}
              </div>
              <div className="flex items-center flex-nowrap gap-x-4">
                <h4 className="text-5xl font-extrabold">45</h4>
                <span>$</span>
              </div>
            </div>
            <Separator className="w-full mx-auto" />
            <div className=" flex flex-col gap-3">
              <ul className="list-none my-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex flex-nowrap items-center gap-x-3">
                      <Image
                        src={checkedIcon}
                        alt={"checked"}
                        width={16}
                        height={16}
                      />
                      <Label className="text-base font-medium">
                        Lorem ipsum dolor sit amet consectetur.
                      </Label>
                    </div>
                  </li>
                ))}
              </ul>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Addons</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap w-full gap-2">
                      {Array.from({ length: 4 }).map((_, t) => (
                        <div
                          className="w-full flex flex-nowrap content-center rounded-xl border shadow p-2 cursor-pointer"
                          key={t}
                        >
                          <Checkbox
                            id={String(`${quote} t_${t}`)}
                            className="w-6 h-6 rounded-xl"
                          />
                          <div className="flex flex-nowrap justify-between flex-1 px-4">
                            <span className="flex-1 cursor-pointer">
                              Quote 1
                            </span>
                            <span className="">
                              <b>10</b> $
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {quote === "company" ? (
                      <div className="flex flex-col gap-4 mt-6 p-2">
                        <a href="#" className="underline">
                          Contact Support
                        </a>
                        <a href="#" className="underline">
                          Schedule meeting
                        </a>
                      </div>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Button
              className="bg-black text-white w-full h-14 rounded-xl text-lg font-semibold text-center"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onTakeAction();
              }}
            >
              Select
            </Button>
          </div>
        )
      )}
    </div>
  );
}
