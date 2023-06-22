import { useCallback, useState, useMemo } from "react";
// event: React.MouseEvent<HTMLDivElement, MouseEvent>
interface UseHoverBind {
  onMouseLeave: () => void;
  onMouseEnter: () => void;
}

export type UseHoverResult = [boolean, UseHoverBind];

export const useHover = (): UseHoverResult => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(() => {
    return [isHover, { onMouseEnter, onMouseLeave }];
  }, [isHover, onMouseEnter, onMouseLeave]);
};
