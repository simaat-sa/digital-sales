"use client";
import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";
import Iframe from "@/shared/components/IFrame";
import { VideoComponent } from "@/shared/components/VideoComponent";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import { displayPrice } from "@/shared/lib/format-pricing";
import { useRouter } from "@/shared/lib/navigation";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";
import { quotesDataV2 } from "../_services/quotesData";
import FeatList from "./FeatList";

const GoogleCalendarSchedulingButtonDynamic = dynamic(
  () => import("@/shared/components/GoogleCalender"),
  {
    ssr: false,
  },
);

const VideoStream = "/assets/svg/icons/media-player.svg";
const CalenderIcon = "/assets/svg/icons/Calender.svg";
const CallIcon = "/assets/svg/icons/Call.svg";
const externalLink = "/assets/svg/icons/Linkexternal.svg";

export default function PricingPlanForm({
  state,
}: {
  state: QuoteRequestModel;
}) {
  const { quotePlan, setState, handleSubmitSelectPlan } =
    useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const tv2 = useTranslations("v2.sales");
  const router = useRouter();

  useEffect(() => {
    if (state) {
      setState(state);
    }
  }, [setState, state]);

  return (
    <div className="container" suppressHydrationWarning>
      <div className="flex h-[8rem] w-full items-center justify-between px-4 lg:px-0">
        <h2 className="inline-flex items-end  text-2xl font-medium lg:text-3xl">
          {t("quotes_title")}
        </h2>
        <div className="flex items-center gap-3">
          <span className="mx-3">{tv2("steps_number", { pageNumber: 3 })}</span>
          <Button variant="outline" type="button" onClick={() => router.back()}>
            {t("back")}
          </Button>
        </div>
      </div>
      <div className="card_pricing_plan grid grid-cols-12 items-start gap-6 px-4 md:px-2 lg:px-0">
        {quotesDataV2.map(
          ({ id, name, features, price, description, business_need_label }) => (
            <div
              className={cn(
                {
                  "bg-gradient-to-r from-secondaryblue-100 to-gray-100 shadow-lg":
                    String(id) === quotePlan,
                },
                "card_pricing_plan_sibling col-span-12 mb-4 flex flex-col gap-y-3 overflow-hidden rounded-lg border bg-white p-4 shadow-md transition-colors duration-150 md:col-span-6 lg:col-span-4",
              )}
              key={String(id)}
            >
              <div className="min-h-30 flex w-full flex-col justify-center gap-4 pt-3">
                <div className="flex w-full flex-nowrap items-center justify-between gap-x-4">
                  <h4 className="text-3xl font-medium">{t(name as any)}</h4>
                  {String(id) === quotePlan ? (
                    <span className="flex items-center rounded-md border bg-primary p-2 font-medium text-white shadow-md shadow-slate-200">
                      {t("best_matching")}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-nowrap items-center gap-x-4">
                  <h4 className="text-5xl font-medium">
                    {displayPrice(price, true)}
                  </h4>
                  <span>{t("s_r_monthly")}</span>
                </div>
              </div>
              <Separator
                className={cn("mx-auto w-full", {
                  "bg-slate-300": String(id) === quotePlan,
                })}
              />
              <div className="flex flex-col gap-4">
                <FeatList
                  quote={{
                    id,
                    name,
                    features,
                    price,
                    description,
                    business_need_label,
                  }}
                  isSpeared
                />
                <Dialog>
                  <DialogTrigger className="flex w-auto justify-start gap-x-6 rounded-md border-2 bg-white p-4 text-secondaryblue lg:w-9/12">
                    <Image
                      src={VideoStream}
                      alt="video stream"
                      width={24}
                      height={24}
                    />
                    <span className="px-2">{t("presentation_video")}</span>
                  </DialogTrigger>
                  <DialogContent className="w-screen">
                    <DialogHeader>
                      <DialogTitle>{t("presentation_video")}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="my-0 py-0">
                      <div className="w-full overflow-hidden">
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
                  <DialogTrigger className="flex w-auto justify-start gap-x-6 rounded-md border-2 bg-white p-4 text-secondaryblue lg:w-9/12">
                    <Image
                      src={VideoStream}
                      alt="video stream"
                      width={24}
                      height={24}
                    />
                    <span className="px-2">{t("demo_video")}</span>
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
                  className="flex w-auto justify-start gap-x-6 rounded-md border-2 bg-white p-4 text-secondaryblue lg:w-9/12"
                >
                  <Image
                    src={externalLink}
                    alt="video stream"
                    width={24}
                    height={24}
                  />
                  <span className="px-2">{t("try_by_yourself")}</span>
                </a>

                {name === "companies" ? (
                  <div className="flex flex-col gap-4 p-2">
                    <Dialog>
                      <DialogTrigger className="flex w-auto flex-nowrap gap-4">
                        <Image
                          src={CallIcon}
                          alt={t("order_call")}
                          width={20}
                          height={20}
                          loading="lazy"
                        />
                        {t("order_call")}
                      </DialogTrigger>
                      <DialogContent className="w-screen">
                        <DialogHeader>
                          <DialogTitle>{t("order_call")}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="my-0 h-full py-0">
                          <div className="w-full overflow-hidden">
                            <iframe
                              src="https://simaat.sa/service/submitticket.php?step=2&deptid=2&subject=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%A7%D9%82%D8%A9%20%D8%B4%D8%B1%D9%83%D8%A7%D8%AA&message=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%AA%D8%B5%D8%A7%D9%84%20%D9%84%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%20%D8%B9%D9%86%20%D9%86%D8%B8%D8%A7%D9%85%20%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%A3%D9%85%D9%84%D8%A7%D9%83%20%D9%84%D8%A8%D8%A7%D9%82%D8%A9%20%D8%B4%D8%B1%D9%83%D8%A7%D8%AA"
                              className="h-[80vh] w-full"
                            ></iframe>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                    <div className="flex items-center gap-2">
                      <Image
                        src={CalenderIcon}
                        alt={t("schedule_meeting")}
                        width={20}
                        height={20}
                        loading="lazy"
                      />
                      <Suspense fallback={null}>
                        <GoogleCalendarSchedulingButtonDynamic />
                      </Suspense>
                    </div>
                  </div>
                ) : null}
              </div>
              <Button
                className="flex w-full flex-nowrap items-center rounded-xl py-7 text-center text-lg font-medium"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmitSelectPlan(id).then(() => {
                    router.push("/get-started/custom-plan", {
                      scroll: true,
                    });
                  });
                }}
              >
                {tv2("custom_your_quote")}
              </Button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
