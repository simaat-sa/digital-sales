declare global {
  interface Window {
    Intercom?: (...args: any[]) => void;
    intercomSettings: any;
    attachEvent: any;
  }
}

// Set your APP_ID (replace with your actual Intercom app ID)
export const APP_ID: string | undefined =
  process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

// Loads Intercom with the snippet
// This must be run before boot, it initializes window?.Intercom
export const load = (): void => {
  (function () {
    const w = window;
    const ic = w?.Intercom;

    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w?.intercomSettings);
    } else {
      const d = document;
      const i: any = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args: any[]) {
        i.q.push(args);
      };
      w.Intercom = i;

      const l = function () {
        const s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${APP_ID}`;
        const x = d.getElementsByTagName("script")[0];
        x?.parentNode?.insertBefore(s, x);
      };

      if (window?.document?.readyState === "complete") {
        l();
      } else if (w?.attachEvent) {
        w?.attachEvent("onload", l);
      } else {
        w?.addEventListener("load", l, false);
      }
    }
  })();
};

// Initializes Intercom
export const boot = (options: { [key: string]: any } = {}) => {
  if (typeof window !== "undefined" && window?.Intercom) {
    window?.Intercom("boot", { app_id: APP_ID, ...options });
  }
};

export const update = (): void => {
  if (window && window?.Intercom) {
    window?.Intercom("update");
  }
};
