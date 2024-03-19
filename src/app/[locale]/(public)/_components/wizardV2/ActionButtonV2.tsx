import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useQuotePricingServiceV2 } from "../../_services/QuotePricingServiceV2";
import PaymentIFrame from "./PaymentFrame";

export default function ActionButtonV2() {
  const {
    currentWizard,
    onTakeAction,
    actionButton,
    dialogPaymentStatus,
    onToggleDialogPaymentStatus,
    disableBtnNext,
    registerWay,
    verifiedDomain,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");

  return (
    <div className="flex w-full items-center justify-between gap-4 pb-4 lg:pb-2">
      {currentWizard !== "summary" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onTakeAction();
          }}
          aria-label="register"
          disabled={
            currentWizard === "domain"
              ? !verifiedDomain
              : currentWizard === "requirements" &&
                  registerWay === "SocialMedia"
                ? disableBtnNext
                : false
          }
        >
          {actionButton === "get_code" ? t("get_code") : null}
          {actionButton === "check_code" ? t("check_code") : null}
          {actionButton === "next" ? t("next") : null}
          {actionButton === "confirm_pay" ? t("confirm_and_pay") : null}
        </Button>
      ) : (
        <Dialog
          open={dialogPaymentStatus}
          onOpenChange={(open) => {
            onToggleDialogPaymentStatus(open);
          }}
        >
          <DialogTrigger>
            <Button
              onClick={(e) => {
                e.preventDefault();
                onToggleDialogPaymentStatus(true);
              }}
              aria-label="confirm"
            >
              {actionButton === "confirm_pay" ? t("confirm_and_pay") : null}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[30rem]">
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
            </DialogHeader>
            <DialogDescription className="my-0 py-0">
              <PaymentIFrame />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}

      {currentWizard !== "register" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onTakeAction(true);
          }}
          aria-label="go back"
          variant="outline"
        >
          {t("back")}
        </Button>
      ) : null}
    </div>
  );
}
