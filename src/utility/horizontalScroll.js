import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const element = elRef.current;
    if (element) {
      function horizontalScroll(event) {
        event.preventDefault();
        element.scrollLeft -= event.deltaY;
      }
      element.addEventListener("wheel", horizontalScroll);
      return () => element.removeEventListener("wheel", horizontalScroll);
    }
  });

  return elRef;
}
