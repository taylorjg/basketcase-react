import { useIsFetching, useIsMutating } from "react-query";

export const useIsActive = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return isFetching > 0 || isMutating > 0;
};
