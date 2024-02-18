import { VideoComponent } from "@/shared/components/VideoComponent";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Fragment } from "react";
import { useQuotePricingService } from "../../_services/QuotePricingService";
import { quotesData } from "../../_services/quotesData";
import FooterSales from "../FooterSales";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";
const VideoStream = "/assets/svg/icons/media-player.svg";

export default function Quotes() {
  const { quotePlan, addons, onTakeAction, onSelectQuote, onSelectAddon } =
    useQuotePricingService();
  const t = useTranslations("sales");

  return (
    <>
      <div className="flex justify-between items-center w-full h-[8rem] px-4 lg:px-0">
        <h2 className="text-3xl font-semibold">{t("quotes_title")}</h2>
        <Button variant="outline" onClick={() => onTakeAction(true)}>
          {t("back")}
        </Button>
      </div>
      <div className=" grid grid-cols-12 items-start gap-6 px-4 md:px-2 lg:px-0">
        {quotesData.map(
          ({ id, name, features, addons: addonsList, price, description }) => (
            <div
              className={cn(
                "flex flex-col gap-y-3 shadow-md rounded-3xl overflow-hidden transition-colors duration-150 bg-white p-4 col-span-12 md:col-span-6 lg:col-span-4 border",
                {
                  "bg-gradient-to-r from-slate-200 to-gray-100 shadow-lg":
                    String(id) === quotePlan,
                }
              )}
              key={String(id)}
            >
              <div className="w-full flex flex-col justify-center gap-4 min-h-40">
                <div className="flex flex-nowrap items-center gap-x-4">
                  <h4 className="font-bold text-2xl">
                    {t("quote")} {t(name as any)}
                  </h4>
                  {String(id) === quotePlan ? (
                    <span className="text-sm font-medium border rounded shadow-md flex items-center p-1">
                      {t("best_matching")}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center flex-nowrap gap-x-4">
                  <h4 className="text-5xl font-extrabold">{price}</h4>
                  <span>{t("s_r_monthly")}</span>
                </div>
              </div>
              <Separator
                className={cn("w-full mx-auto", {
                  "bg-slate-300": String(id) === quotePlan,
                })}
              />
              <div className=" flex flex-col gap-6">
                <p>{description}</p>
                <ul className="list-none">
                  {features.map((feat, index) => (
                    <li
                      key={index}
                      className={cn("mb-4", {
                        "mb-0": features.length - 1 === index,
                      })}
                    >
                      <div className="flex flex-nowrap items-center gap-x-3">
                        <Image
                          src={checkedIcon}
                          alt={"checked"}
                          width={24}
                          height={24}
                        />
                        <Label className="text-base font-medium">{feat}</Label>
                      </div>
                    </li>
                  ))}
                </ul>
                <Fragment>
                  <Dialog>
                    <DialogTrigger className="w-9/12">
                      <Button
                        variant="outline"
                        className="flex justify-start gap-x-6 p-6 w-full border-2"
                      >
                        <Image
                          src={VideoStream}
                          alt="video stream"
                          width={24}
                          height={24}
                        />
                        <span>{t("presentation_video")}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-screen">
                      <DialogHeader>
                        <DialogTitle>{t("presentation_video")}</DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="my-0 py-0">
                        <div className="w-full overflow-hidden">
                          <VideoComponent src="https://www.w3schools.com/html/mov_bbb.mp4" />
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger className="w-9/12">
                      <Button
                        variant="outline"
                        className="flex justify-start gap-x-6 p-6 w-full border-2"
                      >
                        <Image
                          src={VideoStream}
                          alt="video stream"
                          width={24}
                          height={24}
                        />
                        <span>{t("demo_video")}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-screen">
                      <DialogHeader>
                        <DialogTitle>{t("demo_video")}</DialogTitle>
                      </DialogHeader>
                      <DialogDescription className="my-0 py-0">
                        <div className="w-full overflow-hidden">
                          <VideoComponent src="https://www.w3schools.com/html/mov_bbb.mp4" />
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </Fragment>
                <div className="flex flex-wrap w-full gap-2">
                  {addonsList.map((addon, indexT) => (
                    <Label
                      className="w-full flex flex-nowrap content-center items-center align-baseline rounded-xl border shadow p-2 cursor-pointer"
                      key={indexT}
                      htmlFor={`${String(`${id} t_${indexT}`)}`}
                    >
                      <Checkbox
                        id={String(`${id} t_${indexT}`)}
                        className="w-6 h-6 rounded-sm"
                        onCheckedChange={() => {
                          onSelectAddon(id, addon.id);
                        }}
                        checked={addons.get(id)?.includes(addon.id)}
                      />
                      <div className="flex flex-nowrap justify-between items-center flex-1 px-4">
                        <span className="text-base font-medium flex-1 cursor-pointer">
                          {addon.name}
                        </span>
                        <div className="flex flex-nowrap items-center gap-2">
                          <span className="text-xl">{addon.price}</span>
                          <span>{t("s_r")}</span>
                        </div>
                      </div>
                    </Label>
                  ))}
                </div>
                {name === "companies" ? (
                  <div className="flex flex-col gap-4 p-2">
                    <a href="#" className="underline">
                      {t("contact_support")}
                    </a>
                    <a href="#" className="underline">
                      {t("schedule_meeting")}
                    </a>
                  </div>
                ) : null}
              </div>
              <Button
                className="w-full py-7 rounded-xl text-lg font-semibold text-center flex flex-nowrap items-center"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectQuote(id);
                  onTakeAction();
                }}
              >
                {t("subscribe_now")}
              </Button>
            </div>
          )
        )}
      </div>
      <div className="my-4">
        <FooterSales />
      </div>
    </>
  );
}
