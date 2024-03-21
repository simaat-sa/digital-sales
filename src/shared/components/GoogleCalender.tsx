"use client";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { useRef } from "react";

function GoogleCalendarSchedulingButton() {
  const refElement = useRef(null);
  const t = useTranslations("sales");

  return (
    <>
      <Script
        src="https://calendar.google.com/calendar/scheduling-button-script.js"
        onLoad={() => {
          (window as any).calendar.schedulingButton.load({
            url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0B3HrdIkhYVbzyufSC9EU5gfYwWY1C6U8g3rQLaeoxIhDKzTkm9zOOHlFuQ6763c_6JrQQjtBO?gv=true",
            color: "#238FC0",
            label: t("schedule_meeting"),
            target: refElement.current,
          });
        }}
      ></Script>
      <button ref={refElement}></button>
    </>
  );
}

export default GoogleCalendarSchedulingButton;
