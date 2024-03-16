export function displayPrice(
  price: number,
  toFixed: boolean = true,
  locale?: string,
) {
  return `${
    toFixed ? Number(price).toLocaleString() : price
  } ${locale ? (locale === "en" ? "R.S" : "ر.س") : ""}`;
}
