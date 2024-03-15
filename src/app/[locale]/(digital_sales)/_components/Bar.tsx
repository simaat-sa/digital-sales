import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const callIcon = "/assets/svg/icons/MaterialCall.svg";

export default function Bar() {
  const t = useTranslations("common");
  return (
    <div className="relative z-40 flex h-20 w-full bg-white">
      <div className="container   flex items-center justify-between">
        <Link href={"#"}>
          <Image
            src={
              "https://simaat.app/wp-content/uploads/2022/11/simaat_logo-1.svg"
            }
            alt={t("simaat")}
            width={140}
            height={80}
            loading="lazy"
          />
        </Link>
        <div className="flex items-center gap-1">
          <a href="tel:0112938888" className="mt-1 text-xl font-medium">
            011-293-8888
          </a>
          <Image src={callIcon} alt="call" width={24} height={24} />
        </div>
      </div>
    </div>
  );
}
