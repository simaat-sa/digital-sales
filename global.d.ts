// Use type safe message keys with `next-intl`
type Messages = typeof import("@/shared/lib/Localization/en.json");
declare interface IntlMessages extends Messages {}
