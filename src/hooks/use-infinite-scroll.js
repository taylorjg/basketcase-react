import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback) => {
  const observerTargetRef = useRef(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const element = observerTargetRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold: 1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback]);

  return observerTargetRef;
};
