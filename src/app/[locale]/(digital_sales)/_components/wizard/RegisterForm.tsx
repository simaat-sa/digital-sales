import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";

export default function RegisterForm() {
  const { mobileNumber, showCode, code, onChange } = useRequestQuoteService();

  return (
    <div className="w-full flex flex-col gap-12 transition-all duration-300 delay-75">
      <div className="flex flex-col gap-4">
        <Label>Mobile number</Label>
        <Input
          placeholder="ex. +55 000 000 0000"
          value={mobileNumber}
          onChange={(e) => {
            onChange("mobileNumber", e.target.value);
          }}
          className="rtl:direction-normal"
          dir="ltr"
        />
      </div>
      {showCode ? (
        <div className="flex flex-col gap-4">
          <Label>code OTP</Label>
          <Input
            placeholder="# # # #"
            value={code}
            onChange={(e) => {
              onChange("code", e.target.value);
            }}
            className="tracking-widest"
            dir="ltr"
          />
        </div>
      ) : null}
    </div>
  );
}
