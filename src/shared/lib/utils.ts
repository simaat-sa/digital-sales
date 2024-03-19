import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotalWithTax(amount: number, taxRate: number) {
  // Input validation: Ensure amount is a number
  if (typeof amount !== "number") {
    throw new TypeError("Invalid input: amount must be a number.");
  }

  // Calculate tax amount
  const taxAmount = (amount / 100) * taxRate;

  // Calculate total amount, rounding to two decimal places
  const total = amount + taxAmount;

  return Number(total).toFixed(2); // Return formatted total string
}

export function calculateTax(amount: number, taxRate: number) {
  // Input validation: Ensure amount is a number
  if (typeof amount !== "number") {
    throw new TypeError("Invalid input: amount must be a number.");
  }

  // Calculate tax amount
  const taxAmount = amount * (taxRate / 100);

  return Number(taxAmount).toFixed(2); // Return formatted total string
}
