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
import Iframe from "@/shared/components/IFrame";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";
const VideoStream = "/assets/svg/icons/media-player.svg";
const CalenderIcon = "/assets/svg/icons/Calender.svg";
const CallIcon = "/assets/svg/icons/Call.svg";
const externalLink = "/assets/svg/icons/Linkexternal.svg";

export default function Quotes() {
  const { quotePlan, addons, onTakeAction, onSelectQuote, onSelectAddon } =
    useQuotePricingService();
  const t = useTranslations("sales");

  return (
    <>
      <div className="flex h-[8rem] w-full items-center justify-between px-4 lg:px-0">
        <h2 className="text-3xl font-medium">{t("quotes_title")}</h2>
        <Button variant="outline" onClick={() => onTakeAction(true)}>
          {t("back")}
        </Button>
      </div>
      <div className=" grid grid-cols-12 items-start gap-6 px-4 md:px-2 lg:px-0">
        {quotesData.map(
          ({ id, name, features, addons: addonsList, price, description }) => (
            <div
              className={cn(
                "col-span-12 flex flex-col gap-y-3 overflow-hidden rounded-3xl border bg-white p-4 shadow-md transition-colors duration-150 md:col-span-6 lg:col-span-4",
                {
                  "bg-gradient-to-r from-slate-200 to-gray-100 shadow-lg":
                    String(id) === quotePlan,
                },
              )}
              key={String(id)}
            >
              <div className="flex min-h-40 w-full flex-col justify-center gap-4">
                <div className="flex w-full flex-nowrap items-center justify-between gap-x-4">
                  <h4 className="text-2xl font-medium">
                    {t("quote")} {t(name as any)}
                  </h4>
                  {String(id) === quotePlan ? (
                    <span className="flex items-center rounded-md border bg-primary p-2 font-medium text-white shadow-md shadow-slate-200">
                      {t("best_matching")}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-nowrap items-center gap-x-4">
                  <h4 className="text-5xl font-medium">{price}</h4>
                  <span>{t("s_r_monthly")}</span>
                </div>
              </div>
              <Separator
                className={cn("mx-auto w-full", {
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
                        className="flex w-full justify-start gap-x-6 border-2 p-6"
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
                          {/* <VideoComponent src="https://youtu.be/9LnBHZBCQAk?si=IzVRkmxP5xIe7yx_" /> */}

                          <Iframe
                            id="ytplayer"
                            type="text/html"
                            width="100%"
                            height="562.5"
                            src="https://www.youtube.com/embed/9LnBHZBCQAk?si=IzVRkmxP5xIe7yx_"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen={true}
                          />
                        </div>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger className="w-9/12">
                      <Button
                        variant="outline"
                        className="flex w-full justify-start gap-x-6 border-2 p-6"
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
                  <a
                    href="https://demo.simaat.sa/"
                    target="_blank"
                    className="w-9/12"
                  >
                    <Button
                      variant="outline"
                      className="flex w-full justify-start gap-x-6 border-2 p-6"
                    >
                      <Image
                        src={externalLink}
                        alt="video stream"
                        width={24}
                        height={24}
                      />
                      <span>{t("try_by_yourself")}</span>
                    </Button>
                  </a>
                </Fragment>
                <div className="flex w-full flex-wrap gap-2">
                  {addonsList.map((addon, indexT) => (
                    <Label
                      className="flex w-full cursor-pointer flex-nowrap content-center items-center rounded-xl border p-2 align-baseline shadow"
                      key={indexT}
                      htmlFor={`${String(`${id} t_${indexT}`)}`}
                    >
                      <Checkbox
                        id={String(`${id} t_${indexT}`)}
                        className="h-6 w-6 rounded-sm"
                        onCheckedChange={() => {
                          onSelectAddon(id, addon.id);
                        }}
                        checked={addons.get(id)?.includes(addon.id)}
                      />
                      <div className="flex flex-1 flex-nowrap items-center justify-between px-4">
                        <span className="flex-1 cursor-pointer text-base font-medium">
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
                    <Dialog>
                      <DialogTrigger className="flex w-9/12 flex-nowrap gap-4">
                        <Image
                          src={CallIcon}
                          alt={t("order_call")}
                          width={20}
                          height={20}
                          loading="lazy"
                        />
                        {t("order_call")}
                      </DialogTrigger>
                      <DialogContent className="w-screen md:w-[18rem] lg:w-[30rem]">
                        <DialogHeader>
                          <DialogTitle>{t("order_call")}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="my-0 py-0">
                          <div className="w-full overflow-hidden"></div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger className="flex w-9/12 flex-nowrap gap-4">
                        <Image
                          src={CalenderIcon}
                          alt={t("schedule_meeting")}
                          width={20}
                          height={20}
                          loading="lazy"
                        />
                        {t("schedule_meeting")}
                      </DialogTrigger>
                      <DialogContent className="w-screen md:w-[18rem] lg:w-[30rem]">
                        <DialogHeader>
                          <DialogTitle>{t("schedule_meeting")}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="my-0 py-0">
                          <div className="w-full overflow-hidden"></div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <Button
                className="flex w-full flex-nowrap items-center rounded-xl py-7 text-center text-lg font-medium"
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
          ),
        )}
      </div>
    </>
  );
}
