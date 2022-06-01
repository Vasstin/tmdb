import { useRef, useEffect } from "react";

export function useHideHeader() {
  const elRef = useRef();
  useEffect(() => {
    const element = elRef.current;
    function hideHeader(event) {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        element.style.top = "-70px";
      } else {
        element.style.top = "0";
      }
    }
    window.addEventListener("scroll", hideHeader);
  });

  return elRef;
}
