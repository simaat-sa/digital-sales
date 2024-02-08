import { Button } from "@/shared/components/ui/button";
import React from "react";
import {
  Wizards,
  useRequestQuoteService,
} from "../../_services/requestQuoteService";
import { useTranslations } from "next-intl";

export default function ActionButton() {
  const { actionButton, currentWizard, onTakeAction } =
    useRequestQuoteService();
  const t = useTranslations("sales");

  return (
    <div className="w-full pt-8 border-t border-slate-200 flex items-center gap-4">
      {(["register", "requirements"] as Wizards[]).includes(currentWizard) ? (
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
      <Button
        onClick={(e) => {
          e.preventDefault();
          onTakeAction();
        }}
        aria-label="register"
      >
        {actionButton === "get_code" ? t("get_code") : null}
        {actionButton === "check_code" ? t("check_code") : null}
        {actionButton === "next" ? t("next") : null}
        {actionButton === "confirm_pay" ? t("confirm_and_pay") : null}
      </Button>
    </div>
  );
}
