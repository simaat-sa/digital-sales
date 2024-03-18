import { Input, InputProps } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { ChangeEvent } from "react";
import { Label } from "../ui/label";

interface InputDomainProps extends InputProps {
  domain: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export default function InputDomain({
  domain,
  error,
  onChange,
  ...props
}: InputDomainProps) {
  return (
    <>
      <div
        className="-mb-2 flex flex-1 flex-nowrap content-center items-baseline"
        dir="ltr"
      >
        <Input
          value={props.value}
          onChange={onChange}
          className={cn("flex-1", {
            "border-red-600": error.length ? true : false,
          })}
          {...props}
        />
        <Label className="px-2 text-lg lg:text-xl">{domain}</Label>
      </div>
      {error ? <p className="text-left text-xs text-red-600">{error}</p> : null}
    </>
  );
}
