import { cn } from "@/shared/lib/utils";
import { ChangeEvent } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

interface InputBaseProps extends InputProps {
  label?: string;
  hintLabel?: string;
  value?: string | number;
  error?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBase({
  label,
  hintLabel,
  value,
  onChange,
  error,
  placeholder,
  ...props
}: InputBaseProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-x-2">
        {label ? <Label>{label}</Label> : null}
        {hintLabel ? <Label>{hintLabel}</Label> : null}
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn("", {
          "border-red-600": error?.length ? true : false,
        })}
        {...props}
      />
      {error?.length ? (
        <p className="text-sm text-red-600 -mt-3">{error}</p>
      ) : null}
    </div>
  );
}
