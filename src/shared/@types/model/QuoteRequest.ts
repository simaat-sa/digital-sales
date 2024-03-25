import type { registerWay } from "@/app/[locale]/(public)/_services/QuotePricingServiceV2";

export interface QuoteRequestModel {
  email: string;
  emailVerified: boolean;
  mobileNumber: string;
  mobileNumberVerified: boolean;
  firstName: string;
  lastName: string;
  organize: string;
  planId: number;
  addons: number[];
  domain: string;
  domainVerified: boolean;
  promoCodeVerified: boolean;
  business_needed: number;
  registerType: registerWay;
  promoCode: string;
  monthsDuration: number;
}
