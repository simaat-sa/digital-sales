import HeightMotion from "@/shared/components/motions/HeighEffect";
import { useTranslations } from "next-intl";
import Image from "next/image";

const checkedUrl = "/assets/images/check.png";
export default function Success() {
  const t = useTranslations("sales");
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src={checkedUrl}
          alt="successfully"
          width={140}
          height={270}
          loading="lazy"
        />
        <HeightMotion>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold">{t("success_title")}</h2>
            <p className="text-lg font-medium">{t("success_desc")}</p>
            <div>{t("auto_redirect")}</div>
          </div>
        </HeightMotion>
      </div>
    </div>
  );
}
