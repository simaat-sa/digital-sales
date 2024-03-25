import {
  addonsData,
  quotesDataV2,
} from "@/app/[locale]/(public)/_services/quotesData";
import { QuoteRequestModel } from "@/shared/@types/model/QuoteRequest";

export async function getQuotes() {
  return await quotesDataV2;
}

export async function getAddons() {
  return await addonsData;
}

export async function getQuoteRequest(data: string) {
  return data ? (JSON.parse(data) as QuoteRequestModel) : null;
}
