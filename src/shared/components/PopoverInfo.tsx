import Image from "next/image";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const infoIcon = "/assets/svg/icons/MingcuteInformationFill.svg";

export default function PopoverInfo({ children }: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger className="p-0">
        <Image src={infoIcon} alt="info" width={20} height={20} />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
