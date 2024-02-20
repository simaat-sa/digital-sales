import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { useQuotePricingService } from "../../_services/QuotePricingService";

const paymentFormImg = "/assets/online_payments_forms.png";

export default function PaymentIFrame() {
  const { onTakeAction } = useQuotePricingService();
  const t = useTranslations("sales");

  useEffect(() => {
    setTimeout(() => {
      onTakeAction();
    }, 3000);
  }, [onTakeAction]);

  return (
    <p className="text-3xl w-full flex flex-col justify-center items-center">
      <Image
        src={paymentFormImg}
        alt={t("simulate_payment_successfully")}
        width={400}
        height={400}
        loading="lazy"
      />
      <p className="font-semibold text-center">
        {t("simulate_payment_successfully")}
      </p>
    </p>
  );
}
