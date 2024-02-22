"use client";
import { SAUDI_ARABIA_MOBILE_NUMBER_REGEX } from "@/shared/lib/constants";
import { calculateTax, calculateTotalWithTax } from "@/shared/lib/utils";
import { useMemo } from "react";
import {ValidationError, object, string, ObjectSchema} from "yup";
import { create } from "zustand";
import { QuoteModel, quotesData } from "./quotesData";

const taxNumber = 15;

type ActionButton = "get_code" | "check_code" | "next" | "confirm_pay";

export type Wizards =
  | "register"
  | "requirements"
  | "quotes"
  | "domain"
  | "summary"
  | "success";

type QuotePlan = "personal" | "office" | "company" | string;

type FieldName =
  | "mobileNumber"
  | "code"
  | "showCode"
  | "quotePlan"
  | "organizeName"
  | "email"
  | "firstName"
  | "lastName"
  | "domain"
  | "promoCode";

interface IRequestQuoteState {
  currentWizard: Wizards;
  wizardHistory: Wizards[];
  mobileNumber: string;
  code: string;
  showCode: boolean;
  quotePlan: QuotePlan;
  organizeName: string;
  email: string;
  firstName: string;
  lastName: string;
  quoteSelected: number | null;
  addons: Map<string | number, any[]>;
  domain: string;
  verifiedDomain: boolean;
  actionButton: ActionButton;
  disableBtn: boolean;
  paymentMonths: number;
  promoCode: string;
  promoCodeValid: boolean;
  promoCodeValue: number;
  enableReSendCode: boolean;
  pendingReSendCode: boolean;
  dialogPaymentStatus: boolean;
  disable: {
    mobileNumber: boolean;
    email: boolean;
    domain: boolean;
    firstName: boolean;
    lastName: boolean;
    code: boolean;
  };
  errors: {
    mobileNumber: string;
    code: string;
    quotePlan: string;
    email: string;
    domain: string;
    firstName: string;
    lastName: string;
    organizeName: string;
  };
}

interface IRequestQuoteActions {
  _setCurrentWizard: (wizard: Wizards) => void;
  _getCode: () => void;
  _checkCode: () => void;
  _onUpdateWizardHistory: (wizard?: Wizards, isBack?: boolean) => void;
  _isMobileNumberValid: () => boolean;
  _isRequirementsValid: () => Promise<boolean>;
  _onChangeCode: (name: FieldName, value: string) => void;
  _disableField: (name: FieldName, value: boolean) => void;
  _onVerifyPromoCode: () => void;
  setAllAddons: (listAddons: QuoteModel[]) => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onSelectAddon: (quoteId: number, addonId: number) => void;
  onSelectQuote: (id: number) => void;
  onTakeAction: (isBack?: boolean) => void;
  onSelectPaymentWay: (months: number) => void;
  onClickResendCode: () => void;
  onCheckPromoCode: () => void;
  onVerifyDomain: () => void;
  onToggleDialogPaymentStatus: (status: boolean) => void;
}

interface IRequestQuote extends IRequestQuoteState, IRequestQuoteActions {}

const useQuotePricingService = create<IRequestQuote>((set, get) => ({
  currentWizard: "register",
  wizardHistory: [],
  mobileNumber: "",
  code: "",
  showCode: false,
  quotePlan: "",
  email: "",
  organizeName: "",
  firstName: "",
  lastName: "",
  quoteSelected: null,
  addons: new Map(),
  domain: "",
  actionButton: "get_code",
  disableBtn: false,
  paymentMonths: 1,
  promoCode: "",
  promoCodeValid: false,
  promoCodeValue: 100,
  enableReSendCode: true,
  pendingReSendCode: false,
  verifiedDomain: false,
  dialogPaymentStatus: false,
  disable: {
    domain: false,
    email: false,
    firstName: false,
    lastName: false,
    mobileNumber: false,
    code: false,
  },
  errors: {
    mobileNumber: "",
    code: "",
    quotePlan: "",
    email: "",
    domain: "",
    firstName: "",
    lastName: "",
    organizeName: "",
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
    const code = get().code;
    if (code.length === 4) {
      get()._disableField("code", true);
      setTimeout(() => {
        set(() => ({
          currentWizard: "requirements",
          actionButton: "next",
          wizardHistory: ["register"],
        }));
        get()._disableField("code", false);
      }, 1200);
    }
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
  _disableField(name, value) {
    set(() => ({
      disable: {
        ...get().disable,
        [name]: value,
      },
    }));
  },
  async _isRequirementsValid() {
    let quotePlan = get().quotePlan;
    let email = get().email;
    let firstName = get().firstName;
    let lastName = get().lastName;
    let organizeName = get().organizeName;
    let errors = get().errors;
    let schema: ObjectSchema<any>;

    let schemaBase = object({
      quotePlan: string().trim().required("quote_type_is_required"),
      email: string().trim().email().required("email_not_valid"),
    });

    let schemaPersonal = object({
      quotePlan: string().trim().required("quote_type_is_required"),
      firstName: string().trim().required("first_name_required"),
      lastName: string().trim().required("last_name_required"),
      email: string().trim().email().required("email_not_valid"),
    });

    const schemaNotPersonal = object({
      quotePlan: string().required("quote_type_is_required"),
      organizeName: string()
        .trim()
        .required(
          quotePlan === "2" ? "office_name_required" : "company_name_required"
        ),
      email: string().trim().email().required("email_not_valid"),
    });

    if (quotePlan) {
      if (quotePlan === "1") {
        schema = schemaPersonal;
      } else {
        schema = schemaNotPersonal;
      }
    } else {
      schema = schemaBase;
    }

    return new Promise((resolve, reject) => {
      schema
        .validate(
          {
            quotePlan,
            email,
            firstName,
            lastName,
            organizeName,
          },
          { abortEarly: false }
        )
        .then(() => {
          return resolve(true);
        })
        .catch(async (error: ValidationError) => {
          let stackErrors: { [key: string]: string } = {};

          await error.inner.map((message) => {
            console.log("message", message.path, "  ", message.message);

            stackErrors = {
              ...stackErrors,
              [message.path as any]: message.message,
            };
          });

          set(() => ({
            errors: {
              ...errors,
              ...stackErrors,
            },
          }));
          return reject(false);
        });
    });
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

    set(() => ({
      [name]: value,
      errors: {
        ...errors,
        [name]: "",
      },
    }));

    if (name === "quotePlan") {
      set(() => ({
        organizeName: "",
        firstName: "",
        lastName: "",
        errors: {
          ...get().errors,
          firstName: "",
          lastName: "",
          organizeName: "",
        },
      }));
    }
    if (name === "mobileNumber") {
      set(() => ({
        showCode: false,
        code: "",
        actionButton: "get_code",
        disable: {
          ...get().disable,
          code: false,
        },
      }));
    }
  },
  _onChangeCode(name, value) {
    get().onChange(name, value);

    if (name === "code") {
      get()._checkCode();
    }
  },
  _onVerifyPromoCode() {
    set(() => ({
      promoCodeValid: true,
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
  onSelectQuote(id) {
    set(() => ({
      quoteSelected: id,
    }));
  },
  onTakeAction(isBack) {
    let _setCurrentWizard = get()._setCurrentWizard;
    let _onUpdateWizardHistory = get()._onUpdateWizardHistory;
    let _isRequirementsValid = get()._isRequirementsValid;
    let _getCode = get()._getCode;

    if (!isBack) {
      if (get().currentWizard === "register") {
        if (get().actionButton === "get_code") {
          _getCode();
        } else if (get().actionButton === "check_code") {
          _onUpdateWizardHistory("register");
        }
      } else if (get().currentWizard === "requirements") {
        _isRequirementsValid().then(() => {
          _setCurrentWizard("quotes");
          _onUpdateWizardHistory("requirements");
        });
      } else if (get().currentWizard === "quotes") {
        set(() => ({
          actionButton: "next",
          domain:
            get().quotePlan === "1"
              ? get()
                  .quotePlan.replace(/\s/g, "")
                  .replace(/\./g, "")
                  .toLowerCase()
              : get()
                  .organizeName.replace(/\s/g, "")
                  .replace(/\./g, "")
                  .toLowerCase(),
        }));
        _setCurrentWizard("domain");
        _onUpdateWizardHistory("quotes");
      } else if (get().currentWizard === "domain") {
        _setCurrentWizard("summary");
        _onUpdateWizardHistory("domain");
        set(() => ({ actionButton: "confirm_pay" }));
      } else if (get().currentWizard === "summary") {
        _setCurrentWizard("success");
        _onUpdateWizardHistory("summary");
        get().onToggleDialogPaymentStatus(true);
      }
    } else {
      _onUpdateWizardHistory(undefined, true);
    }
  },
  onSelectPaymentWay(months) {
    set(() => ({
      paymentMonths: months,
    }));
  },
  onClickResendCode() {
    set(() => ({
      enableReSendCode: !get().enableReSendCode,
    }));
  },
  onCheckPromoCode() {
    get()._onVerifyPromoCode();
  },
  onVerifyDomain() {
    set(() => ({
      disable: {
        ...get().disable,
        domain: true,
      },
    }));
    setTimeout(() => {
      set(() => ({
        verifiedDomain: true,
      }));
    }, 2000);
  },
  onToggleDialogPaymentStatus(status) {
    set(() => ({
      dialogPaymentStatus: status,
    }));
  },
}));

function useCalcAmounts() {
  const {
    quoteSelected,
    paymentMonths,
    addons,
    promoCodeValue,
    promoCodeValid,
  } = useQuotePricingService();

  const totalInvoice = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;
    let addonsSelected = addons
      .get(quotePrice?.id)!
      .map((id) => quotePrice.addons.find((a) => a.id === id)!.price);

    let totalAddons = 0;

    let totalByMonths = quotePrice?.price * paymentMonths;

    if (addonsSelected.length) {
      totalAddons = addonsSelected.reduce((a, b) => a + b);
    }

    return promoCodeValid
      ? Math.ceil(
          calculateTotalWithTax(totalByMonths + totalAddons, taxNumber)
        ) + promoCodeValue
      : Math.ceil(
          calculateTotalWithTax(totalByMonths + totalAddons, taxNumber)
        );
  }, [addons, paymentMonths, promoCodeValid, promoCodeValue, quoteSelected]);

  const totalTax = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;

    return calculateTax(quotePrice.price * paymentMonths, taxNumber);
  }, [paymentMonths, quoteSelected]);

  return { totalInvoice, totalTax };
}

function useGetQuoteSelected(id: number) {
  return useMemo(() => quotesData.find((q) => q.id === id), [id]);
}

export { useCalcAmounts, useGetQuoteSelected, useQuotePricingService };
