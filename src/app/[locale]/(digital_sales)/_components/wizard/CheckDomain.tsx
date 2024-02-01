import { Label } from "@/shared/components/ui/label";
import React from "react";
import { useRequestQuoteService } from "../../_services/requestQuote";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function CheckDomain() {
  const { onChange } = useRequestQuoteService();
  return (
    <div className="flex flex-nowrap gap-4 items-end">
      <div className="flex flex-col gap-4">
        <Label>Domain</Label>
        <Input placeholder="example.simaat.sa" />
      </div>
      <Button variant="secondary">Check</Button>
    </div>
  );
}
