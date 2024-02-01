import { Button } from "@/shared/components/ui/button";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";

export default function ActionButton() {
  const { actionButton, onTakeAction } = useRequestQuoteService();

  return (
    <div className="w-full pt-8 border-t border-slate-200 flex items-center justify-end">
      <Button
        onClick={(e) => {
          e.preventDefault();
          onTakeAction();
        }}
        aria-label="register"
      >
        {actionButton === "get_code" ? "Get code" : null}
        {actionButton === "check_code" ? "Check code" : null}
        {actionButton === "next" ? "Next" : null}
      </Button>
    </div>
  );
}
