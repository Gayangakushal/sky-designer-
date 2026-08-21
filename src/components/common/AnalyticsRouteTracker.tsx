import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Sends one virtual page view for each genuine client-side route change. */
const AnalyticsRouteTracker = () => {
  const route = useRouterState({
    select: (state) => `${state.location.pathname}${state.location.searchStr}`,
  });
  const previousRoute = useRef(route);

  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;

    window.fbq?.("track", "PageView");
    window.dataLayer?.push({
      event: "virtual_page_view",
      page_path: route,
      page_location: window.location.href,
    });
  }, [route]);

  return null;
};

export default AnalyticsRouteTracker;
