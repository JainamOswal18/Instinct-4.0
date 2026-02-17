"use client";
import React, { useRef, startTransition } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ElasticLineProps {
    lineColor?: string;
    strokeWidth?: number;
    tension?: number;
    friction?: number;
    height?: number | string;
    className?: string;
}

export default function ElasticLine({
    lineColor = "#22c55e", // Updated default to match theme green
    strokeWidth = 2,
    tension = 400,
    friction = 15,
    height = 100, // Slightly taller default for easier interaction
    className
}: ElasticLineProps) {
    const INTERNAL_WIDTH = 1000;
    const numericHeight = typeof height === "number" ? height : (parseFloat(height as string) || 100);
    const centerY = numericHeight / 2;

    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const bendY = useMotionValue(0);

    const springConfig = { stiffness: tension, damping: friction };
    const animatedBendY = useSpring(bendY, springConfig);

    const path = useTransform(animatedBendY, (currentBend) => {
        const safeBend = isNaN(currentBend) ? 0 : currentBend;
        return `M 0 ${centerY} Q ${INTERNAL_WIDTH / 2} ${centerY + safeBend} ${INTERNAL_WIDTH} ${centerY}`;
    });

    const startDrag = (event: React.PointerEvent<SVGPathElement>) => {
        startTransition(() => {
            isDragging.current = true;
        });
        // animatedBendY.stop(); // Not available on MotionValue in standard framer-motion, jumping via set() is fine
        dragStartY.current = event.clientY;
        bendY.set(animatedBendY.get());
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onDrag = (event: React.PointerEvent<SVGPathElement>) => {
        if (!isDragging.current) return;
        const delta = event.clientY - dragStartY.current;
        bendY.set(delta * 0.8);
    };

    const stopDrag = (event: React.PointerEvent<SVGPathElement>) => {
        startTransition(() => {
            isDragging.current = false;
        });
        event.currentTarget.releasePointerCapture(event.pointerId);
        bendY.set(0);
    };

    return (
        <div
            className={className}
            style={{
                width: "100%",
                height: numericHeight,
                display: "flex",
                alignItems: "center",
                overflow: "visible",
                position: "relative"
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${INTERNAL_WIDTH} ${numericHeight}`}
                preserveAspectRatio="none"
                style={{ overflow: "visible", display: "block" }}
            >
                {/* Visible Line */}
                <motion.path
                    d={path}
                    stroke={lineColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    style={{ pointerEvents: "none" }}
                />

                {/* Hit Area */}
                <motion.path
                    d={path}
                    stroke="transparent"
                    strokeWidth={Math.max(40, numericHeight)}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    onPointerDown={startDrag}
                    onPointerMove={onDrag}
                    onPointerUp={stopDrag}
                    onPointerLeave={stopDrag}
                    style={{ cursor: "grab", pointerEvents: "auto" }}
                    whileTap={{ cursor: "grabbing" }}
                />
            </svg>
        </div>
    );
}
