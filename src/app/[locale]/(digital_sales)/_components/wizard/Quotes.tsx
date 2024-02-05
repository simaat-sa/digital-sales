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
import { useTranslations } from "next-intl";
import { quotesData } from "../../_services/quotesData";
import { VideoComponent } from "@/shared/components/VideoComponent";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";

export default function Quotes() {
  const { quotePlan, addons, addonsId, onTakeAction, onSelectAddon } =
    useRequestQuoteService();
  const t = useTranslations("sales");

  return (
    <div className="w-full min-h-screen grid grid-cols-12 items-center gap-6 py-8 px-4 md:px-2 lg:px-0">
      {quotesData.map(({ id, name, features, addons: addonsList, price }) => (
        <div
          className={cn(
            "flex flex-col gap-y-3 shadow-md rounded-3xl overflow-hidden transition-colors duration-150 bg-white p-4 col-span-12 md:col-span-6 lg:col-span-4",
            {
              "bg-gradient-to-r from-slate-200 to-gray-100 shadow-lg":
                String(id) === quotePlan,
            }
          )}
          key={String(id)}
        >
          <div className="w-full flex flex-col justify-center gap-8 min-h-40">
            <div className="flex flex-nowrap items-center gap-x-4">
              <h4 className="font-bold text-2xl">{t(name as any)}</h4>
              {String(id) === quotePlan ? (
                <span className="text-xs border rounded-md shadow p-2">
                  {t("best_matching")}
                </span>
              ) : null}
            </div>
            <div className="flex items-center flex-nowrap gap-x-4">
              <h4 className="text-5xl font-extrabold">{price}</h4>
              <span>{t("s_r")}</span>
            </div>
          </div>
          <Separator className="w-full mx-auto" />
          <div className=" flex flex-col gap-3">
            <ul className="list-none my-3">
              {features.map((feat, index) => (
                <li key={index} className="mb-4">
                  <div className="flex flex-nowrap items-center gap-x-3">
                    <Image
                      src={checkedIcon}
                      alt={"checked"}
                      width={16}
                      height={16}
                    />
                    <Label className="text-base font-medium">{feat}</Label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="w-full h-48">
              <VideoComponent src="https://www.youtube.com/watch?v=hdSntGFXgSE" />
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Addons</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap w-full gap-2">
                    {addonsList.map((addon, t) => (
                      <Label
                        className="w-full flex flex-nowrap content-center items-center rounded-xl border shadow p-2 cursor-pointer"
                        key={t}
                        htmlFor={`${String(`${id} t_${t}`)}`}
                      >
                        <Checkbox
                          id={String(`${id} t_${t}`)}
                          className="w-6 h-6 rounded-sm"
                          onCheckedChange={() => {
                            onSelectAddon(id, addon.id);
                          }}
                          checked={addons.includes(addon.id) && addonsId === id}
                        />
                        <div className="flex flex-nowrap justify-between flex-1 px-4">
                          <span className="flex-1 cursor-pointer">
                            {addon.name}
                          </span>
                          <span>
                            <b>{addon.price}</b> $
                          </span>
                        </div>
                      </Label>
                    ))}
                  </div>
                  {name === "companies" ? (
                    <div className="flex flex-col gap-4 mt-6 p-2">
                      <a href="#" className="underline">
                        {t("contact_support")}
                      </a>
                      <a href="#" className="underline">
                        {t("schedule_meeting")}
                      </a>
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Button
            className="bg-black text-white w-full h-14 rounded-xl text-base font-semibold text-center"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onTakeAction();
            }}
          >
            {t("continue_counts", {
              total:
                quotesData.find((a) => a.id === addonsId) && addonsId === id
                  ? quotesData
                      .find((a) => a.id === addonsId)!
                      .addons.filter((s) => addons.includes(s.id))
                      .map((a) => a.price)
                      ?.reduce((a, b) => a + b) + price
                  : price,
            })}
          </Button>
        </div>
      ))}
    </div>
  );
}
