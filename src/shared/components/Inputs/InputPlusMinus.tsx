import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import { Input, InputProps } from "../ui/input";

const plusIcon = "/assets/svg/icons/Plus.svg";
const minusIcon = "/assets/svg/icons/Minus.svg";

interface InputPlusMinusProps extends InputProps {
  setIncrement: () => void;
  setDecrement: () => void;
  disabledPlus?: boolean;
  disabledMinus?: boolean;
  
}

export default function InputPlusMinus({
  setIncrement,
  setDecrement,
  ...props
}: InputPlusMinusProps) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="flex w-full overflow-hidden rounded border shadow">
      <Button
        onClick={(e) => {
          e.preventDefault();
          setDecrement();
        }}
        className="flex h-full items-center justify-center rounded-none border-0 shadow-none"
        disabled={props.disabledMinus}
      >
        <Image
          src={minusIcon}
          alt="minus"
          width={32}
          height={32}
          loading="lazy"
        />
      </Button>
      <Input
        className="shadow-non my-auto h-full rounded-none border-0 py-2 text-center align-baseline text-xl font-medium"
        type="number"
        onWheel={handleWheel}
        {...props}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIncrement();
        }}
        className="flex h-full items-center justify-center rounded-none border-0 shadow-none"
        disabled={props.disabledPlus}
      >
        <Image
          src={plusIcon}
          alt="plus"
          width={32}
          height={32}
          loading="lazy"
        />
      </Button>
    </div>
  );
}
