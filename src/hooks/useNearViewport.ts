import { useEffect, useRef, useState } from "react";

export const useNearViewport = <T extends HTMLElement>(rootMargin = "600px") => {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isNear) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return { ref, isNear };
};
