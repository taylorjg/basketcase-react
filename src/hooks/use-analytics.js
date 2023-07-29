/* global gtag */

import { useCallback } from "react";

export const useAnalytics = () => {
  const sendAnalyticsClickEvent = useCallback((eventName, eventParams) => {
    if (typeof window.gtag !== "undefined") {
      const command = "event";
      if (eventParams) {
        gtag(command, eventName, eventParams);
      } else {
        gtag(command, eventName);
      }
    }
  }, []);

  return { sendAnalyticsClickEvent };
};
