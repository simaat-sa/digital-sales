import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";

export default function RequirementForm() {
  const { quotePlan, email, onChange } = useRequestQuoteService();
  return (
    <>
      <div className="flex flex-col gap-4">
        <Label>Quote Type</Label>
        <Select
          onValueChange={(value) => onChange("quotePlan", value)}
          value={quotePlan}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {(["personal", "office", "company"] as (typeof quotePlan)[]).map(
              (quote) => (
                <SelectItem value={quote} onChange={() => {}} key={quote}>
                  {quote}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-x-4">
          <Label>Email</Label>
          <Label className="text-xs text-slate-600 lowercase">(optional)</Label>
        </div>
        <Input
          placeholder="example@domain.com"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => {
            onChange("email", e.target.value);
          }}
        />
      </div>
    </>
  );
}
