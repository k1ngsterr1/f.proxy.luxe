import { useState, useEffect } from "react";

export function useIsTablet(min: number = 938, max: number = 1150) {
  const [isTable, setIsTable] = useState(
    typeof window !== "undefined" &&
      window.innerWidth >= min &&
      window.innerWidth <= max
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTable(window.innerWidth >= min && window.innerWidth <= max);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [min, max]);

  return isTable;
}
