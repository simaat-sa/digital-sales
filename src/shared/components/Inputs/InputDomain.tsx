import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "../ui/label";

interface InputDomainProps {
  value: string;
  onChange: (value: string) => void;
  domain: string;
}

export default function InputDomain({
  domain,
  value,
  onChange,
}: InputDomainProps) {
  return (
    <div
      className="flex flex-1 flex-nowrap items-baseline content-center"
      dir="ltr"
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
      <Label className="px-2">{domain}</Label>
    </div>
  );
}
