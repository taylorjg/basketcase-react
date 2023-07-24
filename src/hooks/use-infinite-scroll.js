import { useEffect, useState } from "react";

export const useInfiniteScroll = (callback) => {
  const [observerTarget, setObserverTarget] = useState();

  const observerTargetRef = (element) => {
    setObserverTarget(element);
  };

  useEffect(() => {
    const observerTargetLocal = observerTarget;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    if (observerTargetLocal) {
      observer.observe(observerTargetLocal);
    }

    return () => {
      if (observerTargetLocal) {
        observer.unobserve(observerTargetLocal);
      }
    };
  }, [callback, observerTarget]);

  return observerTargetRef;
};
