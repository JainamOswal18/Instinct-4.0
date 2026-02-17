"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimatedNumber({
    value,
    className,
    springOptions,
}: {
    value: number;
    className?: string;
    springOptions?: {
        bounce?: number;
        duration?: number;
    };
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, springOptions);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    latest.toFixed(0) as any // Cast to specific type if needed, but NumberFormat accepts string/number
                );
            }
        });
    }, [springValue]);

    return (
        <span
            className={cn("inline-block tabular-nums text-black dark:text-white tracking-wider", className)}
            ref={ref}
        />
    );
}
