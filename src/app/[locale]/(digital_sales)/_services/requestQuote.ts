"use client";
import { create } from "zustand";
import yup from "yup";

type ActionButton = "get_code" | "check_code" | "next" | "confirm_pay";

type Wizards = "register" | "requirements" | "quotes" | "domain";

type QuotePlan = "personal" | "office" | "company";

type FieldName = "mobileNumber" | "code" | "showCode" | "quotePlan" | "email";

interface IRequestQuoteState {
  currentWizard: Wizards;
  wizardHistory: Wizards[];
  mobileNumber: string;
  code: string;
  showCode: boolean;
  quotePlan: QuotePlan;
  email: string;
  addons: string[];
  actionButton: ActionButton;
  disableBtn: boolean;
}

interface IRequestQuoteActions {
  _setCurrentWizard: (wizard: Wizards) => void;
  _getCode: () => void;
  _checkCode: () => void;
  _onUpdateWizardHistory: (wizard?: Wizards, isBack?: boolean) => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onTakeAction: (isBack?: boolean) => void;
}

interface IRequestQuote extends IRequestQuoteState, IRequestQuoteActions {}

const useRequestQuoteService = create<IRequestQuote>((set, get) => ({
  currentWizard: "register",
  wizardHistory: [],
  mobileNumber: "",
  code: "",
  showCode: false,
  quotePlan: "personal",
  email: "",
  addons: [],
  actionButton: "get_code",
  disableBtn: false,
  _setCurrentWizard(wizard) {
    return set(() => ({
      currentWizard: wizard,
      wizardHistory: [...get().wizardHistory, wizard],
    }));
  },
  _getCode() {
    // validated the mobile number and call api to get the code for OTP.
    return set(() => ({
      actionButton: "check_code",
      showCode: true,
    }));
  },
  _checkCode() {
    // validated the code OTP and call api to check.
    return set(() => ({
      currentWizard: "requirements",
      actionButton: "next",
    }));
  },
  _onUpdateWizardHistory(wizard, isBack) {
    if (!isBack && wizard) {
      set(() => ({
        wizardHistory: [...get().wizardHistory, wizard],
      }));
    } else {
      let prevWizard = get().wizardHistory.pop();
      if (prevWizard === "register") {
        set(() => ({
          actionButton: "get_code",
          code: "",
          showCode: false,
          currentWizard: "register",
          wizardHistory: [],
        }));
      } else {
        set(() => ({
          currentWizard: prevWizard,
          wizardHistory: get().wizardHistory.slice(0, -1),
        }));
      }
    }
  },

  onChange(name, value) {
    return set(() => ({
      [name]: value,
    }));
  },
  onTakeAction(isBack) {
    if (!isBack) {
      if (get().currentWizard === "register") {
        switch (get().actionButton) {
          case "get_code":
            get()._getCode();
            break;

          case "check_code":
            get()._checkCode();
            get()._onUpdateWizardHistory("register");
            break;

          default:
            break;
        }
      } else if (get().currentWizard === "requirements") {
        get()._setCurrentWizard("quotes");
        get()._onUpdateWizardHistory("requirements");
      } else if (get().currentWizard === "quotes") {
        set(() => ({ actionButton: "confirm_pay" }));
        get()._setCurrentWizard("domain");
        get()._onUpdateWizardHistory("quotes");
      }
    } else {
      get()._onUpdateWizardHistory(undefined, true);
    }
  },
}));

export { useRequestQuoteService };
