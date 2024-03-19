import { SAUDI_ARABIA_MOBILE_NUMBER_REGEX } from "@/shared/lib/constants";
import { calculateTax } from "@/shared/lib/utils";
import { signOut } from "next-auth/react";
import { useMemo } from "react";
import { ObjectSchema, ValidationError, object, string } from "yup";
import { create } from "zustand";
import { AddonV2, quotesData, quotesDataV2 } from "./quotesData";

export const ADDON_STEPS = 50;
const taxNumber = 15;

type registerWay = "MobileNumber" | "SocialMedia" | "";

export type QuotePlan = "personal" | "office" | "company" | string;

export type FieldName =
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

export type Wizards =
  | "register"
  | "requirements"
  | "quotes"
  | "domain"
  | "summary"
  | "custom_quote"
  | "success";

export type ActionButtonV2 = "get_code" | "check_code" | "next" | "confirm_pay";

export type AddonV2Dropdown = AddonV2 & {
  price_selected: number;
};

export type AddonV2PlusMinus = AddonV2 & {
  count: number;
};

export type CustomQuotesSelected = AddonV2 & {
  count: number;
};

export type AddonSelectedDropdown = AddonV2 & {
  price_selected: number;
};

export type AddonSelectedPlusMinus = AddonV2 & {
  count: number;
  total: number;
};

export type AddonSelected = AddonV2;

interface QuotePricingStateType {
  registerWay: registerWay;
  AddonSelected: CustomQuotesSelected[];
  AddonSelectedPlusMinus: AddonSelectedPlusMinus[];
  AddonSelectedDropdown: AddonSelectedDropdown[];
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
  _checkCode: () => void;
  _isMobileNumberValid: () => boolean;
  _isRequirementsValid: () => Promise<boolean>;
  _onChangeCode: (name: FieldName, value: string) => void;
  _disableField: (name: FieldName, value: boolean) => void;
  _onVerifyPromoCode: () => void;
  onTakeAction: (isBack?: boolean) => void;
  resetV2: () => void;
  onChange: (name: FieldName, value: string | number | boolean) => void;
  onSelectQuote: (id: number) => void;
  onSelectAddon: (addon: AddonV2) => void;
  onSelectAddonDropDown: (addon: AddonV2) => void;
  onSelectAddonPlusMinus: (addon: AddonV2) => void;
  onChangePlusMinus: (value: number, addon: AddonV2) => void;
  onSelectPaymentWay: (months: number) => void;
  onClickResendCode: () => void;
  onCheckPromoCode: () => void;
  onVerifyDomain: () => void;
  onToggleDialogPaymentStatus: (status: boolean) => void;
  onLoginWithGoogle: (email?: string) => void;
  addAddon: (addon: AddonV2) => void;
  removeAddon: (addonId: number) => void;
  setIncrement: (addonId: number, steps: number) => void;
  setDecrement: (addonId: number, steps: number) => void;
  onChangeAddonDropdown: (addonId: number, value: number) => void;
  signOut: () => void;
}

interface QuotePricingV2 extends QuotePricingStateType, IRequestQuoteActions {}

const useQuotePricingServiceV2 = create<QuotePricingV2>((set, get) => ({
  registerWay: "",
  currentWizard: "register",
  AddonSelected: [],
  AddonSelectedDropdown: [],
  AddonSelectedPlusMinus: [],
  actionButton: "get_code",
  wizardHistory: [],
  country_code: 966,
  mobileNumber: "",
  code: "",
  showCode: false,
  quotePlan: "1",
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
  onSelectAddon(addon) {
    set(() => ({
      AddonSelected: !get().AddonSelected.find((item) => item.id === addon.id)
        ? [...get().AddonSelected, { ...addon, count: 1 }]
        : get().AddonSelected.filter((item) => item.id !== addon.id),
    }));
  },
  onSelectAddonDropDown(addon) {
    set(() => ({
      AddonSelectedDropdown: !get().AddonSelectedDropdown.find(
        (item) => item.id === addon.id,
      )
        ? [
            ...get().AddonSelectedDropdown,
            { ...addon, price_selected: addon.data[0].price },
          ]
        : get().AddonSelectedDropdown.filter((item) => item.id !== addon.id),
    }));
  },
  onSelectAddonPlusMinus(addon) {
    set(() => ({
      AddonSelectedPlusMinus: !get().AddonSelectedPlusMinus.find(
        (item) => item.id === addon.id,
      )
        ? [
            ...get().AddonSelectedPlusMinus,
            {
              ...addon,
              count: addon.data[0].from,
              total: addon.data[0].price * addon.data[0].from,
            },
          ]
        : get().AddonSelectedPlusMinus.filter((item) => item.id !== addon.id),
    }));
  },
  addAddon(addon) {
    set(() => ({
      AddonSelected: [...get().AddonSelected, { ...addon, count: 1 }],
    }));
  },
  removeAddon(addonId) {
    set(() => ({
      AddonSelected: get().AddonSelected.filter((item) => item.id !== addonId),
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
      get().onClickResendCode();
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
    let country_code = get().country_code;

    const isValid = SAUDI_ARABIA_MOBILE_NUMBER_REGEX.test(
      `${country_code}${mobileNumber}`,
    );

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
  resetV2() {
    set(useQuotePricingServiceV2.getInitialState());
  },
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
    if (get().domain.length) {
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
    } else {
      set(() => ({
        errors: {
          ...get().errors,
          domain: "domain_is_required",
        },
      }));
    }
  },
  onToggleDialogPaymentStatus(status) {
    set(() => ({
      dialogPaymentStatus: status,
    }));
  },
  setDecrement(addonId, steps) {
    set(() => ({
      AddonSelectedPlusMinus: get().AddonSelectedPlusMinus.map((item) => {
        if (item.id === addonId) {
          const MIN_RANGE = item.data[0].from;
          let count =
            item.count - steps < MIN_RANGE ? MIN_RANGE : item.count - steps;
          const range = item.data.find((r) => r.from <= count && r.to >= count);

          item.count = count;
          item.total = range ? count * range.price : count * item.price;
        }
        return item;
      }),
    }));
  },
  setIncrement(addonId, steps) {
    set(() => ({
      AddonSelectedPlusMinus: get().AddonSelectedPlusMinus.map((item) => {
        if (item.id === addonId && item.count) {
          const MAX_RANGE = item.data[item.data.length - 1].to;

          let count =
            item.count + steps > MAX_RANGE ? MAX_RANGE : item.count + steps;

          const range = item.data.find((r) => r.from <= count && r.to >= count);

          item.count = count;
          item.total = range ? count * range.price : count * item.price;
        }
        return item;
      }),
    }));
  },
  onChangePlusMinus(value, addon) {
    set(() => ({
      AddonSelectedPlusMinus: get().AddonSelectedPlusMinus.map((item) => {
        if (item.id === addon.id) {
          const MIN_RANGE = item.data[0].from;
          const MAX_RANGE = item.data[item.data.length - 1].to;

          if (MIN_RANGE <= value && value <= MAX_RANGE) {
            item.count = value;
          }

          const range = item.data.find(
            (r) => r.from <= item.count && r.to >= item.count,
          );

          item.total = range
            ? item.count * range.price
            : item.count * item.price;
        }
        return item;
      }),
    }));
  },
  onChangeAddonDropdown(addonId, value) {
    set(() => ({
      AddonSelectedDropdown: get().AddonSelectedDropdown.map((item) => {
        if (item.id === addonId) {
          item.price_selected = value;
        }
        return item;
      }),
    }));
  },
  signOut() {
    signOut().then(() => {
      get().resetV2();
    });
  },
}));

function useGetQuoteSelectedV2(id: number) {
  return useMemo(() => quotesDataV2.find((q) => q.id === id), [id]);
}

function useSummaryCalcTax() {
  const {
    AddonSelected,
    AddonSelectedPlusMinus,
    AddonSelectedDropdown,
    paymentMonths,
    quoteSelected,
  } = useQuotePricingServiceV2();

  const totalAddons = useMemo(() => {
    let addonsSelected = AddonSelected.map((Item) => Item.price);
    let PlusMinus = AddonSelectedPlusMinus.map((Item) => Item.total);
    let Dropdown = AddonSelectedDropdown.map((Item) => Item.price_selected);

    let totalAddons = 0;

    if (addonsSelected.length) {
      totalAddons = addonsSelected.reduce((a, b) => a + b);
    }

    if (PlusMinus.length) {
      totalAddons = PlusMinus.reduce((a, b) => a + b);
    }

    if (Dropdown.length) {
      totalAddons = Dropdown.reduce((a, b) => a + b);
    }

    return totalAddons;
  }, [AddonSelected, AddonSelectedDropdown, AddonSelectedPlusMinus]);

  const totalTax = useMemo(() => {
    const quotePrice = quotesData.find((quote) => quote.id === quoteSelected)!;

    if (quotePrice) {
      return +calculateTax(
        quotePrice.price * paymentMonths + totalAddons,
        taxNumber,
      );
    } else {
      return 0;
    }
  }, [paymentMonths, quoteSelected, totalAddons]);

  return { totalTax: Math.ceil(totalTax) };
}

function useInvoiceCustomAddons() {
  const {
    quoteSelected,
    AddonSelected,
    AddonSelectedPlusMinus,
    AddonSelectedDropdown,
  } = useQuotePricingServiceV2();
  let quote = quotesDataV2.find((item) => item.id === quoteSelected);

  return useMemo(() => {
    if (quote) {
      let addonsSelectedTotal = AddonSelected.length
        ? AddonSelected.map((a) => a.price).reduce((a, b) => a + b)
        : 0;

      let addonPlusMinusTotal = AddonSelectedPlusMinus.length
        ? AddonSelectedPlusMinus.map((a) => a.total).reduce((a, b) => a + b)
        : 0;

      let addDropdownTotal = AddonSelectedDropdown.length
        ? AddonSelectedDropdown.map((a) => a.price_selected).reduce(
            (a, b) => a + b,
          )
        : 0;

      return (
        quote.price +
        addonsSelectedTotal +
        addonPlusMinusTotal +
        addDropdownTotal
      );
    }
  }, [AddonSelected, AddonSelectedDropdown, AddonSelectedPlusMinus, quote]);
}

function useInvoiceSummary() {
  const {
    paymentMonths,
    quoteSelected,
    AddonSelected,
    AddonSelectedPlusMinus,
    AddonSelectedDropdown,
    promoCodeValid,
    promoCodeValue,
  } = useQuotePricingServiceV2();
  let quote = quotesDataV2.find((item) => item.id === quoteSelected);
  const { totalTax } = useSummaryCalcTax();

  return useMemo(() => {
    if (quote) {
      let addonsSelectedTotal = AddonSelected.length
        ? AddonSelected.map((a) => a.price).reduce((a, b) => a + b)
        : 0;

      let addonPlusMinusTotal = AddonSelectedPlusMinus.length
        ? AddonSelectedPlusMinus.map((a) => a.total).reduce((a, b) => a + b)
        : 0;

      let addDropdownTotal = AddonSelectedDropdown.length
        ? AddonSelectedDropdown.map((a) => a.price_selected).reduce(
            (a, b) => a + b,
          )
        : 0;

      let totalByMonths = quote.price * paymentMonths;

      let total =
        totalByMonths +
        addonsSelectedTotal +
        addonPlusMinusTotal +
        addDropdownTotal +
        totalTax;

      return Math.ceil(promoCodeValid ? total - promoCodeValue : total);
    } else {
      return 0;
    }
  }, [
    quote,
    AddonSelected,
    AddonSelectedDropdown,
    AddonSelectedPlusMinus,
    paymentMonths,
    promoCodeValid,
    promoCodeValue,
    totalTax,
  ]);
}

export {
  useGetQuoteSelectedV2,
  useInvoiceCustomAddons,
  useInvoiceSummary,
  useQuotePricingServiceV2,
  useSummaryCalcTax,
};
