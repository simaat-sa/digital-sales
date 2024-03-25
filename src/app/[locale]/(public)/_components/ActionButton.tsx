import { Button, ButtonProps } from "@/shared/components/ui/button";
import { useRouter } from "@/shared/lib/navigation";
import type { ReactNode } from "react";

function ActionButtonRoot({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">{children}</div>
  );
}

type ButtonSubmitProps = ButtonProps;

function ButtonSubmit(props: ButtonProps) {
  return <Button variant="default" {...props} />;
}

function ButtonBack(props: ButtonProps) {
  const router = useRouter();
  return <Button variant="link" {...props} onClick={() => router.back()} />;
}

export const ActionButton = {
  Root: ActionButtonRoot,
  Submit: ButtonSubmit,
  Back: ButtonBack,
};
