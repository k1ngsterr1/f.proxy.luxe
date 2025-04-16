"use client";
import { useState, useEffect } from "react";

export function useIsSmallerTablet(min: number = 768, max: number = 937) {
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
