"use client";
import { SAUDI_ARABIA_MOBILE_NUMBER_REGEX } from "@/shared/lib/constants";
import { create } from "zustand";
import { string } from "yup";
import { QuoteModel } from "./quotesData";

type ActionButton = "get_code" | "check_code" | "next" | "confirm_pay";

export type Wizards = "register" | "requirements" | "quotes" | "domain";

type QuotePlan = "personal" | "office" | "company" | string;

type FieldName =
  | "mobileNumber"
  | "code"
  | "showCode"
  | "quotePlan"
  | "email"
  | "domain";

interface IRequestQuoteState {
  currentWizard: Wizards;
  wizardHistory: Wizards[];
  mobileNumber: string;
  code: string;
  showCode: boolean;
  quotePlan: QuotePlan;
  email: string;
  addonsId: number | null;
  addons: Map<string | number, any[]>;
  domain: string;
  actionButton: ActionButton;
  disableBtn: boolean;
  errors: {
    mobileNumber: string;
    code: string;
    quotePlan: string;
    email: string;
    domain: string;
  };
}

interface IRequestQuoteActions {
  _setCurrentWizard: (wizard: Wizards) => void;
  _getCode: () => void;
  _checkCode: () => void;
  _onUpdateWizardHistory: (wizard?: Wizards, isBack?: boolean) => void;
  _isMobileNumberValid: () => boolean;
  _isRequirementsValid: () => boolean;
  setAllAddons: (listAddons: QuoteModel[]) => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onSelectAddon: (quoteId: number, addonId: number) => void;
  onTakeAction: (isBack?: boolean) => void;
}

interface IRequestQuote extends IRequestQuoteState, IRequestQuoteActions {}

const useRequestQuoteService = create<IRequestQuote>((set, get) => ({
  currentWizard: "register",
  wizardHistory: [],
  mobileNumber: "",
  code: "",
  showCode: false,
  quotePlan: "",
  email: "",
  addonsId: null,
  addons: new Map(),
  domain: "",
  actionButton: "get_code",
  disableBtn: false,
  errors: {
    mobileNumber: "",
    code: "",
    quotePlan: "",
    email: "",
    domain: "",
  },

  _setCurrentWizard(wizard) {
    return set(() => ({
      currentWizard: wizard,
      wizardHistory: [...get().wizardHistory, wizard],
    }));
  },
  _getCode() {
    let isValid = get()._isMobileNumberValid();

    if (isValid) {
      return set(() => ({
        actionButton: "check_code",
        showCode: true,
      }));
    }
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
  _isMobileNumberValid() {
    let mobileNumber = get().mobileNumber;
    const isValid = SAUDI_ARABIA_MOBILE_NUMBER_REGEX.test(mobileNumber);

    if (!isValid) {
      set(() => ({
        errors: {
          ...get().errors,
          mobileNumber: "mobile_number_not_valid",
        },
      }));
    }

    return isValid;
  },
  _isRequirementsValid() {
    let quotePlan = get().quotePlan;
    let email = get().email;
    let errors = get().errors;
    let quotePlanSelect = quotePlan.length > 0;
    let isEmailValid = string().email().required().isValidSync(email);

    if (!quotePlanSelect) {
      set(() => ({
        errors: {
          ...errors,
          quotePlan: "quote_type_is_required",
        },
      }));
    }

    if (email && !isEmailValid) {
      set(() => ({
        errors: {
          ...errors,
          email: "email_not_valid",
        },
      }));
    }

    return email ? isEmailValid && quotePlanSelect : quotePlanSelect;
  },
  setAllAddons(listAddons) {
    let list = new Map();
    listAddons.map((q) => {
      list.set(q.id, []);
    });

    set(() => ({
      addons: list,
    }));
  },
  onChange(name, value) {
    let errors = get().errors;
    return set(() => ({
      [name]: value,
      errors: {
        ...errors,
        [name]: "",
      },
    }));
  },
  onSelectAddon(quoteId, addonId) {
    const allAddons = get().addons;
    let addonsById = get().addons.get(quoteId);

    if (addonsById?.includes(addonId)) {
      allAddons.set(
        quoteId,
        addonsById.filter((a) => a !== addonId)
      );
    } else {
      if (addonsById) {
        allAddons.set(quoteId, [...addonsById, addonId]);
      } else {
        allAddons.set(quoteId, [addonId]);
      }
    }

    set(() => ({
      addons: allAddons.set(quoteId, allAddons.get(quoteId)!),
    }));
  },
  onTakeAction(isBack) {
    let _setCurrentWizard = get()._setCurrentWizard;
    let _onUpdateWizardHistory = get()._onUpdateWizardHistory;
    let _isRequirementsValid = get()._isRequirementsValid;
    let _getCode = get()._getCode;
    let _checkCode = get()._checkCode;

    if (!isBack) {
      if (get().currentWizard === "register") {
        switch (get().actionButton) {
          case "get_code":
            _getCode();
            break;

          case "check_code":
            _checkCode();
            _onUpdateWizardHistory("register");
            break;

          default:
            break;
        }
      } else if (get().currentWizard === "requirements") {
        let isValidStep = _isRequirementsValid();
        if (isValidStep) {
          _setCurrentWizard("quotes");
          _onUpdateWizardHistory("requirements");
        }
      } else if (get().currentWizard === "quotes") {
        set(() => ({ actionButton: "confirm_pay" }));
        _setCurrentWizard("domain");
        _onUpdateWizardHistory("quotes");
      }
    } else {
      _onUpdateWizardHistory(undefined, true);
    }
  },
}));

export { useRequestQuoteService };
