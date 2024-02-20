import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Wizard from "../src/app/[locale]/(digital_sales)/digital-sales/page";
import messages from "../src/shared/lib/Localization/en.json";

// If the tested component uses features from Next.js, you have to mock them.
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({ locale: "en" }),
  useSelectedLayoutSegment: () => ({ locale: "en" }),
}));

describe("Wizard component", () => {
  let domElement;

  it("Render input mobile number", () => {
    const { getByLabelText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Wizard />
      </NextIntlClientProvider>
    );

    const inputElem = getByLabelText(/mobile number/i);

    expect(inputElem).toBeInTheDocument();
  });

  it("Render input mobile number", () => {
    const { getByLabelText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Wizard />
      </NextIntlClientProvider>
    );
    const inputElem = getByLabelText(/mobile number/i);

    fireEvent.change(inputElem, {
      target: { value: "966551111111" },
    });

    expect(inputElem.value).toBe("966551111111");
  });
});
