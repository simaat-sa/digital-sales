export type PaymentWay = "Quarter" | "Half" | "Year" | "Month";

export interface IPaymentWay {
  type: PaymentWay;
  label: {
    ar: string;
    en: string;
  };
  months: number;
}

export const paymentWay: IPaymentWay[] = [
  {
    type: "Month",
    label: {
      en: "Monthly",
      ar: "شهري",
    },
    months: 1,
  },
  {
    type: "Quarter",
    label: {
      en: "Quarter yearly",
      ar: "ربع سنوي",
    },
    months: 4,
  },
  {
    type: "Half",
    label: {
      en: "Half yearly",
      ar: "نصف سنوي",
    },
    months: 6,
  },
  {
    type: "Year",
    label: {
      en: "Yearly",
      ar: "سنوي",
    },
    months: 12,
  },
];
