import { Input, InputProps } from "@/shared/components/ui/input";
import { ChangeEvent } from "react";
import { Label } from "../ui/label";

interface InputDomainProps extends InputProps {
  domain: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputDomain({
  domain,
  onChange,
  ...props
}: InputDomainProps) {
  return (
    <div
      className="flex flex-1 flex-nowrap items-baseline content-center"
      dir="ltr"
    >
      <Input
        value={props.value}
        onChange={onChange}
        className="flex-1"
        {...props}
      />
      <Label className="px-2 text-lg lg:text-xl">{domain}</Label>
    </div>
  );
}
