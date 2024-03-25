import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export default function LayoutGrid({
  isGrid,
  hasBg,
  withoutBg,
  children,
}: {
  isGrid?: boolean;
  hasBg?: boolean;
  withoutBg?: boolean;
  children: ReactNode;
}) {
  return (
    <main
      className={cn(
        "relative bg-slate-50 after:bottom-0 after:left-0 after:top-0 after:z-10 after:w-1/2 after:bg-contain after:bg-center after:bg-no-repeat lg:after:absolute lg:after:content-[''] rtl:after:right-0",
        {
          "after:bg-[url('/assets/brand/digital-sales-bg.png')]": hasBg
            ? true
            : false,
          "after:left-unset z-10 after:bottom-0 after:right-0 after:top-0  after:z-10 after:w-1/2 after:bg-white lg:after:absolute lg:after:content-[''] rtl:after:left-0 rtl:after:right-[unset]":
            withoutBg ? true : false,
        },
      )}
    >
      <section className="container relative z-20">
        {isGrid ? (
          <div className="min-h-layout grid w-full grid-cols-2">
            <div className="hidden h-full items-center justify-center lg:flex"></div>
            <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
              <div className="mx-auto flex w-full flex-1 flex-col items-end justify-center gap-12 px-2 md:w-2/4 md:px-3 lg:w-3/5 lg:px-6">
                {children}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
