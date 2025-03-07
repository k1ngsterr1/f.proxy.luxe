"use client";

import React, { useRef, useEffect, ReactNode, memo } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface FancyboxProps {
    delegate?: string;
    options?: Record<string, unknown>;
    children: ReactNode;
}

const Fancybox = memo(({
                           delegate = "[data-fancybox]",
                           options = {},
                           children
                       }: FancyboxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    }, [delegate, options]);

    return <div ref={containerRef}>{children}</div>;
});

Fancybox.displayName = "Fancybox";

export default Fancybox;