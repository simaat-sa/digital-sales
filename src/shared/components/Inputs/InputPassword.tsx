"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { Input, InputProps } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

interface InputPasswordProps extends InputProps {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  withIcon?: boolean;
}

export default function InputPassword({
  value,
  onChange,
  label,
  disabled,
  withIcon,
}: InputPasswordProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      {label ? <Label>{label}</Label> : null}
      <div className="flex flex-nowrap flex-1">
        {withIcon ? (
          <Image
            src={"/assets/svg/icons/lockPassword.svg"}
            alt="password"
            width={20}
            height={20}
          />
        ) : null}
        <Input
          type={open ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="password"
          disabled={disabled}
          className="flex-1"
        />

        <Button
          className="border-0 outline-none"
          variant="outline"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Image
            src={"/assets/svg/icons/eye.svg"}
            alt="password"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </Button>
      </div>
    </div>
  );
}
