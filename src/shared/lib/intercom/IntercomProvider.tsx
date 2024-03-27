"use client";
import useRouterChange from "@/shared/hooks/useRouterChange";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "../navigation";
import {
  boot as bootIntercom,
  load as loadIntercom,
  update as updateIntercom,
} from "./index";

const IntercomProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState<boolean>(false);
  useRouterChange({
    onRouterChanged() {
      handleRouteChange(pathname);
    },
    loaded,
  });

  const handleRouteChange = (url: string) => {
    if (typeof window !== "undefined") {
      updateIntercom();
    }
  };

  function loadLib() {
    return new Promise<boolean>((resolve, reject) => {
      try {
        if (typeof window !== "undefined") {
          loadIntercom();
          bootIntercom();
          resolve(true);
        }
      } catch (error: any) {
        reject(true);
      }
    });
  }

  useEffect(() => {
    loadLib()
      .then(() => {
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(false);
      });
  }, []);

  return children;
};

export default IntercomProvider;
