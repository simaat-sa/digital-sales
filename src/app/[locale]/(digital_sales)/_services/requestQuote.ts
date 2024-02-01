"use client";
import { create } from "zustand";

type ActionButton = "get_code" | "check_code" | "next";
type Wizards = "register" | "requirements" | "quotes" | "domain";

type QuotePlan = "personal" | "office" | "company";

type FieldName = "mobileNumber" | "code" | "showCode" | "quotePlan";

interface IRequestQuoteState {
  currentWizard: Wizards;
  mobileNumber: string;
  code: string;
  showCode: boolean;
  quotePlan: QuotePlan;
  addons: string[];
  actionButton: ActionButton;
  disableBtn: boolean;
}

interface IRequestQuoteActions {
  _setCurrentWizard: (wizard: Wizards) => void;
  _getCode: () => void;
  _checkCode: () => void;
  _getNext: () => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onTakeAction: () => void;
}

interface IRequestQuote extends IRequestQuoteState, IRequestQuoteActions {}

const useRequestQuoteService = create<IRequestQuote>((set, get) => ({
  currentWizard: "register",
  mobileNumber: "",
  quotePlan: "personal",
  code: "",
  showCode: false,
  addons: [],
  actionButton: "get_code",
  disableBtn: false,
  _setCurrentWizard(wizard) {
    return set(() => ({
      currentWizard: wizard,
    }));
  },
  _getCode() {
    return set(() => ({
      actionButton: "check_code",
      showCode: true,
    }));
  },
  _checkCode() {
    return set(() => ({
      currentWizard: "requirements",
      actionButton: "next",
    }));
  },
  _getNext() {},
  onChange(name, value) {
    return set(() => ({
      [name]: value,
    }));
  },
  onTakeAction() {
    if (get().currentWizard === "register") {
      switch (get().actionButton) {
        case "get_code":
          get()._getCode();
          break;

        case "check_code":
          get()._checkCode();
          break;

        default:
          break;
      }
    } else if (get().currentWizard === "requirements") {
      get()._setCurrentWizard("quotes");
    } else if (get().currentWizard === "quotes") {
      get()._setCurrentWizard("domain");
    }
  },
}));

export { useRequestQuoteService };
