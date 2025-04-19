import { useEffect } from "react";

const useOutsideClickSidebar = (
  ref: React.RefObject<HTMLElement> | React.RefObject<null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        window.innerWidth <= 768 &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      )
        callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

const useOutsideClick = (
  ref: React.RefObject<HTMLElement> | React.RefObject<null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export { useOutsideClick, useOutsideClickSidebar };
