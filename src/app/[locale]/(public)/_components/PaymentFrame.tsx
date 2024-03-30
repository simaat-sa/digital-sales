"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuotePricingServiceV2 } from "../_services/QuotePricingServiceV2";

const paymentFormImg = "/assets/online_payments_forms.png";

export default function PaymentIFrame() {
  const { handleSubmitSummaryInvoice } = useQuotePricingServiceV2();
  const t = useTranslations("sales");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      handleSubmitSummaryInvoice().then(() =>
        router.push("/get-started/success", { scroll: true }),
      );
    }, 3000);
  }, [handleSubmitSummaryInvoice, router]);

  return (
    <p className="flex w-full flex-col items-center justify-center text-3xl">
      <Image
        src={paymentFormImg}
        alt={t("simulate_payment_successfully")}
        width={400}
        height={400}
        loading="lazy"
      />
      <p className="text-center font-medium">
        {t("simulate_payment_successfully")}
      </p>
    </p>
  );
}
