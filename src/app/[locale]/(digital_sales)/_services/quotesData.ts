export type QuoteModel = {
  id: number;
  name: string;
  features: string[];
  addons: Addon[];
  price: number;
};

type Addon = {
  id: number;
  price: number;
  name: string;
};

export const quotesData: QuoteModel[] = [
  {
    id: 1,
    name: "real-estate",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 12, id: 2 },
      { name: "أضافة 3", price: 15, id: 3 },
    ],
    features: [
      "عدد مستخدمين 1",
      "عدد العقارات/الوحدات غير محدودة",
      "عدد العقود غير محدود",
      "عدد العملاء غير محدودين",
      "فواتير إلكترونية يشمل",
      "المصروفات مستوى عقد/عقار",
      "العقود والتنبيهات شامل",
    ],
    price: 299,
  },
  {
    id: 2,
    name: "offices",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 12, id: 2 },
      { name: "أضافة 3", price: 13, id: 3 },
      { name: "أضافة 4", price: 15, id: 4 },
    ],
    features: [
      "عدد مستخدمين 4",
      "جميع مميزات العقاري",
      "مؤشرات ورسوم بيانية يشمل",
      "نظام محاسبي آلي متكامل ",
      "تقارير تفصيلية مستوى وحدة/عقار",
      "نظام صيانة وتشغيل شامل",
    ],
    price: 499,
  },
  {
    id: 3,
    name: "companies",
    addons: [
      { name: "أضافة 1", price: 10, id: 1 },
      { name: "أضافة 2", price: 15, id: 2 },
    ],
    features: [
      "عدد مستخدمين 10",
      "جميع مميزات المكاتب",
      "خدمات المستأجر الذاتية",
      "خدمات المالك الذاتية",
      "المدفوعات الألكترونية بطاقة مدى",
      "ذكاء إصطناعي متابعة صيانة/تحصيل",
      "تعلم الآلة اختيار صور/تصحيح اخطاء",
    ],
    price: 1999,
  },
];
