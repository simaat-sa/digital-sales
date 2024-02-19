import { useEffect } from "react";
import { useQuotePricingService } from "../../_services/QuotePricingService";

export default function PaymentIFrame() {
  const { onTakeAction } = useQuotePricingService();

  useEffect(() => {
    setTimeout(() => {
      onTakeAction();
    }, 3000);
  }, []);

  return (
    <p className="text-3xl font-semibold text-center w-full">
      Simulate Payment successfully
    </p>
  );
}
