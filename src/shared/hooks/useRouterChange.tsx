"use client";
import { useEffect, useState } from "react";
import { usePathname } from "../lib/navigation";

export default function useRouterChange({
  loaded,
  onRouterChanged,
}: {
  loaded: boolean;
  onRouterChanged: () => void;
}) {
  const pathname = usePathname();
  const [changes, setChanges] = useState(0);

  useEffect(() => {
    if (loaded) {
      setChanges((prev) => {
        onRouterChanged();
        return prev + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, pathname]);

  return <></>;
}
