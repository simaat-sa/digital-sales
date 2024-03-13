import { SAUDI_ARABIA_MOBILE_NUMBER_REGEX } from "@/shared/lib/constants";
import { calculateTax, calculateTotalWithTax } from "@/shared/lib/utils";
import { useMemo } from "react";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { ObjectSchema, ValidationError, object, string } from "yup";
import { create } from "zustand";
import { FieldName, QuotePlan, taxNumber } from "./QuotePricingService";
import { AddonV2, quotesData } from "./quotesData";

const STEPS = 50;

type registerWay = "MobileNumber" | "SocialMedia" | "";

export type Wizards =
  | "register"
  | "requirements"
  | "quotes"
  | "domain"
  | "summary"
  | "custom_quote"
  | "success";

export type ActionButtonV2 = "get_code" | "check_code" | "next" | "confirm_pay";

export type CustomQuotesSelected = AddonV2 & {
  count: number;
};

interface QuotePricingStateType {
  registerWay: registerWay;
  customQuotesSelected: CustomQuotesSelected[];
  actionButton: ActionButtonV2;
  currentWizard: Wizards;
  wizardHistory: Wizards[];
  country_code: number;
  mobileNumber: string;
  code: string;
  showCode: boolean;
  quotePlan: QuotePlan;
  organizeName: string;
  email: string;
  firstName: string;
  lastName: string;
  quoteSelected: number | null;
  domain: string;
  verifiedDomain: boolean;
  disableBtnNext: boolean;
  paymentMonths: number;
  promoCode: string;
  promoCodeValid: boolean;
  promoCodeValue: number;
  enableReSendCode: boolean;
  pendingReSendCode: boolean;
  dialogPaymentStatus: boolean;
  verifiedEmail: boolean;
  verifiedMobile: boolean;
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
  _getCode: (isRegister: boolean) => void;
  _onUpdateWizardHistory: (wizard?: Wizards, isBack?: boolean) => void;
  onSelectCustomAddon: (addon: AddonV2) => void;
  onTakeAction: (isBack?: boolean) => void;
  resetV2: () => void;
  _checkCode: () => void;
  _isMobileNumberValid: () => boolean;
  _isRequirementsValid: () => Promise<boolean>;
  _onChangeCode: (name: FieldName, value: string) => void;
  _disableField: (name: FieldName, value: boolean) => void;
  _onVerifyPromoCode: () => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onSelectQuote: (id: number) => void;
  onSelectPaymentWay: (months: number) => void;
  onClickResendCode: () => void;
  onCheckPromoCode: () => void;
  onVerifyDomain: () => void;
  onToggleDialogPaymentStatus: (status: boolean) => void;
  onLoginWithGoogle: (email?: string) => void;
  reset: () => void;
  addAddon: (addon: AddonV2) => void;
  removeAddon: (addonId: number) => void;
  setIncrement: (addonId: number) => void;
  setDecrement: (addonId: number) => void;
  onChangeAddonCounts: (addonId: number, value: number) => void;
}

interface QuotePricingV2 extends QuotePricingStateType, IRequestQuoteActions {}

const useQuotePricingServiceV2 = create<QuotePricingV2>((set, get) => ({
  registerWay: "",
  currentWizard: "register",
  customQuotesSelected: [],
  actionButton: "get_code",
  wizardHistory: [],
  country_code: 966,
  mobileNumber: "",
  code: "",
  showCode: false,
  quotePlan: "",
  email: "",
  verifiedDomain: false,
  organizeName: "",
  firstName: "",
  lastName: "",
  quoteSelected: null,
  domain: "",
  disableBtnNext: true,
  paymentMonths: 1,
  promoCode: "",
  promoCodeValid: false,
  promoCodeValue: 100,
  enableReSendCode: true,
  pendingReSendCode: false,
  dialogPaymentStatus: false,
  disable: {
    domain: false,
    email: false,
    firstName: false,
    lastName: false,
    mobileNumber: false,
    code: false,
  },
  verifiedEmail: false,
  verifiedMobile: false,
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
  onLoginWithGoogle(email) {
    set(() => ({
      email: email,
      verifiedEmail: true,
      registerWay: "SocialMedia",
      actionButton: "get_code",
    }));
  },
  onSelectCustomAddon(addon) {
    set(() => ({
      customQuotesSelected: !get().customQuotesSelected.find(
        (item) => item.id === addon.id,
      )
        ? [...get().customQuotesSelected, { ...addon, count: 1 }]
        : get().customQuotesSelected.filter((item) => item.id !== addon.id),
    }));
  },
  addAddon(addon) {
    set(() => ({
      customQuotesSelected: [
        ...get().customQuotesSelected,
        { ...addon, count: 1 },
      ],
    }));
  },
  removeAddon(addonId) {
    set(() => ({
      customQuotesSelected: get().customQuotesSelected.filter(
        (item) => item.id !== addonId,
      ),
    }));
  },
  _setCurrentWizard(wizard) {
    return set(() => ({
      currentWizard: wizard,
      wizardHistory: [...get().wizardHistory, wizard],
    }));
  },
  _getCode(isRegister) {
    let isValid = get()._isMobileNumberValid();

    if (isValid) {
      return set(() => ({
        actionButton: isRegister ? "check_code" : "next",
        showCode: true,
        disableBtnNext: true,
      }));
    }
  },
  _checkCode() {
    const code = get().code;
    if (code.length === 4) {
      get()._disableField("code", true);

      if (get().currentWizard === "register") {
        setTimeout(() => {
          set(() => ({
            currentWizard: "requirements",
            actionButton: "next",
            wizardHistory: ["register"],
            verifiedMobile: true,
            registerWay: "MobileNumber",
          }));
          get()._disableField("code", false);
        }, 1200);
      }

      if (get().currentWizard === "requirements") {
        setTimeout(() => {
          set(() => ({
            actionButton: "next",
            verifiedMobile: true,
            disableBtnNext: false,
            disable: {
              ...get().disable,
              mobileNumber: true,
            },
          }));
        }, 1200);
      }
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
    let schema: ObjectSchema<Record<string, string>>;

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
          quotePlan === "2" ? "office_name_required" : "company_name_required",
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
          { abortEarly: false },
        )
        .then(() => {
          return resolve(true);
        })
        .catch(async (error: ValidationError) => {
          let stackErrors: { [key: string]: string } = {};

          await error.inner.map((message) => {
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
        disableBtnNext: String(value).length ? false : true,
        disable: {
          ...get().disable,
          code: false,
        },
      }));
    }

    if (name === "code") {
      get()._checkCode();
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

  onSelectQuote(id) {
    set(() => ({
      quoteSelected: id,
    }));
  },
  resetV2() {},
  onTakeAction(isBack) {
    let _setCurrentWizard = get()._setCurrentWizard;
    let _onUpdateWizardHistory = get()._onUpdateWizardHistory;
    let _isRequirementsValid = get()._isRequirementsValid;
    let _getCode = get()._getCode;

    if (!isBack) {
      if (get().currentWizard === "register") {
        if (get().actionButton === "get_code") {
          _getCode(true);
        } else if (get().actionButton === "check_code") {
          _onUpdateWizardHistory("register");
        }
      } else if (get().currentWizard === "requirements") {
        if (get().verifiedMobile) {
          _isRequirementsValid().then(() => {
            _setCurrentWizard("quotes");
            _onUpdateWizardHistory("requirements");
          });
        } else {
          _getCode(false);
        }
      } else if (get().currentWizard === "quotes") {
        _setCurrentWizard("custom_quote");
        _onUpdateWizardHistory("quotes");
      } else if (get().currentWizard === "custom_quote") {
        set(() => ({
          actionButton: "confirm_pay",
          domain:
            get().firstName.trim() + get().lastName.trim() ||
            get().organizeName.trim() ||
            "",
        }));

        _setCurrentWizard("domain");
        _onUpdateWizardHistory("custom_quote");
        set(() => ({ actionButton: "next" }));
      } else if (get().currentWizard === "domain") {
        set(() => ({ actionButton: "confirm_pay" }));
        _setCurrentWizard("summary");
        _onUpdateWizardHistory("domain");
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
        disableBtnNext: false,
      }));
    }, 2000);
  },
  onToggleDialogPaymentStatus(status) {
    set(() => ({
      dialogPaymentStatus: status,
    }));
  },
  reset() {
    set(useQuotePricingServiceV2.getInitialState());
  },
  setDecrement(addonId) {
    set(() => ({
      customQuotesSelected: get().customQuotesSelected.map((item) => {
        if (item.id === addonId && item.count! > 1) {
          item.count = item.count! < STEPS ? 1 : item.count! - STEPS;
        }
        return item;
      }),
    }));
  },
  setIncrement(addonId) {
    set(() => ({
      customQuotesSelected: get().customQuotesSelected.map((item) => {
        if (item.id === addonId && item.count) {
          item.count = item.count + STEPS;
        }
        return item;
      }),
    }));
  },
  onChangeAddonCounts(addonId, value) {
    set(() => ({
      customQuotesSelected: get().customQuotesSelected.map((item) => {
        if (item.id === addonId) {
          item.count = +value;
        }
        return item;
      }),
    }));
  },
}));

function useCalcAmountsV2() {
  const {
    customQuotesSelected,
    paymentMonths,
    promoCodeValue,
    promoCodeValid,
    quoteSelected,
  } = useQuotePricingServiceV2();

  const totalInvoice = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;

    let addonsSelected = customQuotesSelected.map((Item) => Item.price);

    let totalAddons = 0;

    let totalByMonths = quotePrice?.price * paymentMonths;

    if (addonsSelected.length) {
      totalAddons = addonsSelected.reduce((a, b) => a + b);
    }

    return promoCodeValid
      ? Math.ceil(
          calculateTotalWithTax(totalByMonths + totalAddons, taxNumber),
        ) - promoCodeValue
      : Math.ceil(
          calculateTotalWithTax(totalByMonths + totalAddons, taxNumber),
        );
  }, [
    customQuotesSelected,
    paymentMonths,
    promoCodeValid,
    promoCodeValue,
    quoteSelected,
  ]);

  const totalTax = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;

    return calculateTax(quotePrice?.price * paymentMonths, taxNumber);
  }, [paymentMonths, quoteSelected]);

  const invoiceTotalWithoutTax = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;

    let addonPlusAndMinus = customQuotesSelected
      .filter((item) => item.addonType === "PLUS_MINUS")
      .map((item) => {
        let range = item.data.find(
          (r) => r.from <= item.count || r.to >= item.count,
        );
        if (range) {
          return range.price * item.count;
        } else {
          return item.count * item.data[0].price;
        }
      });
    console.log("🚀 ~ invoiceTotalWithoutTax ~ addonPlusAndMinus:", addonPlusAndMinus)

    let totalAddons = 0;

    let totalByMonths = quotePrice?.price * paymentMonths;

    if (addonPlusAndMinus.length) {
      totalAddons = addonPlusAndMinus.reduce((a, b) => a + b);
    }

    return totalByMonths + totalAddons;
  }, [customQuotesSelected, paymentMonths, quoteSelected]);

  return { totalInvoice, totalTax, invoiceTotalWithoutTax };
}

function useGetQuoteSelectedV2(id: number) {
  return useMemo(() => quotesData.find((q) => q.id === id), [id]);
}

function useCalcTotalAddon(addon: AddonV2) {
  const { customQuotesSelected } = useQuotePricingServiceV2();

  return useMemo(() => {
    switch (addon.addonType) {
      case "PLUS_MINUS":
        const addonSelected = customQuotesSelected.find(
          (item) => item.id === addon.id,
        );

        if (addonSelected) {
          const filter = addonSelected.data.find(
            (item) =>
              item.from <= addonSelected.count &&
              item.to >= addonSelected.count,
          );

          if (filter) {
            return filter.price * addonSelected.count;
          } else {
            return addonSelected.price;
          }
        } else {
          return 0;
        }

      default:
        return 0;
    }
  }, [addon.addonType, addon.id, customQuotesSelected]);
}

export {
  useCalcAmountsV2,
  useCalcTotalAddon,
  useGetQuoteSelectedV2,
  useQuotePricingServiceV2,
};

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("QuotePricingServiceV2", useQuotePricingServiceV2);
}
