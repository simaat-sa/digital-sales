import { Button } from "@/shared/components/ui/button";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";

export default function ActionButton() {
  const {
    actionButton,
    disableBtn,
    currentWizard,
    wizardHistory,
    onTakeAction,
  } = useRequestQuoteService();
  console.log(
    "🚀 ~ ActionButton ~ currentWizard:",
    currentWizard,
    wizardHistory
  );

  return (
    <div className="w-full pt-8 border-t border-slate-200 flex items-center justify-end gap-4">
      {currentWizard !== "register" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onTakeAction(true);
          }}
          aria-label="go back"
          variant="outline"
        >
          Back
        </Button>
      ) : null}
      <Button
        onClick={(e) => {
          e.preventDefault();
          onTakeAction();
        }}
        aria-label="register"
        // disabled={disableBtn}
      >
        {actionButton === "get_code" ? "Get code" : null}
        {actionButton === "check_code" ? "Check code" : null}
        {actionButton === "next" ? "Next" : null}
        {actionButton === "confirm_pay" ? "Confirm and Pay" : null}
      </Button>
    </div>
  );
}
