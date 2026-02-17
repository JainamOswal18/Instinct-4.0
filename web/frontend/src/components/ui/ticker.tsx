"use client"

import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const dotMatrixFont: Record<string, number[][]> = {
    A: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    B: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
    C: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    D: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
    E: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
    F: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
    G: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    H: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    I: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
    J: [[0, 0, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 0, 0]],
    K: [[1, 0, 0, 0, 1], [1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
    L: [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
    M: [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    N: [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    O: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    P: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
    Q: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 0], [0, 1, 1, 0, 1]],
    R: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
    S: [[0, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
    T: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
    U: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    V: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
    W: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 0, 0, 1]],
    X: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    Y: [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    Z: [[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
    "0": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "1": [[0, 0, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0]],
    "2": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "3": [[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "4": [[0, 0, 0, 1, 0], [0, 0, 1, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0]],
    "5": [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "6": [[0, 0, 1, 1, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "7": [[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0], [0, 1, 0, 0, 0]],
    "8": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    "9": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 1, 1, 0, 0]],
    " ": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    "!": [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]],
    ".": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0]],
    ",": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1], [0, 0, 1, 1, 0]]
};

interface DotMatrixScrollProps {
    messages: { text: string; link?: string }[];
    dotColor?: string;
    hoverDotColor?: string;
    backgroundColor?: string;
    speed?: number; // pixels per second
    dotSize?: number;
    dotSpacing?: number;
}

export default function DotMatrixScroll({
    messages = [],
    dotColor = "#f97316", // Orange-500
    hoverDotColor = "#ffffff",
    backgroundColor = "#1e293b", // Slate-800
    speed = 50,
    dotSize = 2,
    dotSpacing = 6
}: DotMatrixScrollProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const scrollOffsetRef = useRef(0);
    const [isHovering, setIsHovering] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
    const navigate = useNavigate();

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                setWidth(rect.width);
                setHeight(rect.height);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use a fixed spacing for calculations

        const charWidth = 5 * dotSpacing;
        const paddingPixels = 50; // space between messages

        const getMessageWidth = (msg: string) => {
            // 5 cols per char + 1 col spacing = 6 cols * dotSpacing
            return msg.length * (5 * dotSpacing + dotSpacing);
        };

        // Calculate total layout width
        let totalLayoutWidth = 0;
        messages.forEach(msg => {
            totalLayoutWidth += getMessageWidth(msg.text) + paddingPixels;
        });

        let lastTime = performance.now();

        const animate = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;

            if (!isHovering) {
                scrollOffsetRef.current += (speed * delta) / 1000;
                if (scrollOffsetRef.current >= totalLayoutWidth) {
                    scrollOffsetRef.current %= totalLayoutWidth;
                }
            }

            // Clear
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // Draw Loop
            // We start drawing from -offset.
            // We draw enough copies to fill width.

            let cursorX = -scrollOffsetRef.current;

            // Determine how many copies we need
            // If cursorX < 0, we might need to draw checking from end?
            // Simpler: Just loop adding totalLayoutWidth until cursorX > width

            let safetyBreak = 0;

            // Ensure we start far enough back if offset is negative?
            // offset is [0, totalLayoutWidth].
            // So cursorX is [-totalLayoutWidth, 0].
            // We just need to draw copy 0, copy 1, copy 2...

            while (cursorX < width && safetyBreak < 100) {
                let messageX = cursorX;

                messages.forEach(msg => {
                    const msgW = getMessageWidth(msg.text);

                    if (messageX + msgW > 0 && messageX < width) {
                        // Draw this message
                        // Check hover
                        let isMsgHovered = false;
                        if (isHovering && mousePos.x >= messageX && mousePos.x <= messageX + msgW) {
                            isMsgHovered = true;
                        }

                        ctx.fillStyle = isMsgHovered ? hoverDotColor : dotColor;

                        // Draw Chars
                        let charX = messageX;
                        for (let i = 0; i < msg.text.length; i++) {
                            const char = msg.text[i].toUpperCase();
                            const matrix = dotMatrixFont[char] || dotMatrixFont[" "];

                            if (charX + charWidth > 0 && charX < width) {
                                // Draw Matrix (7 rows, 5 cols)
                                for (let r = 0; r < 7; r++) {
                                    for (let c = 0; c < 5; c++) {
                                        if (matrix[r][c] === 1) {
                                            const cx = charX + c * dotSpacing + dotSpacing / 2;
                                            const cy = (height - (7 * dotSpacing)) / 2 + r * dotSpacing + dotSpacing / 2;

                                            ctx.beginPath();
                                            ctx.arc(cx, cy, dotSize, 0, Math.PI * 2);
                                            ctx.fill();
                                        }
                                    }
                                }
                            }
                            charX += 5 * dotSpacing + dotSpacing; // advance char width + spacing
                        }
                    }
                    messageX += msgW + paddingPixels;
                });

                cursorX = messageX; // Move to next copy
                safetyBreak++;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
        };
    }, [width, height, isHovering, scrollOffsetRef, messages, dotColor, hoverDotColor, backgroundColor, speed, mousePos]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleClick = () => {
        const paddingPixels = 50;
        const getMessageWidth = (msg: { text: string }) => msg.text.length * (5 * dotSpacing + dotSpacing);

        let totalLayoutWidth = 0;
        messages.forEach(msg => {
            totalLayoutWidth += getMessageWidth(msg) + paddingPixels;
        });

        // Normalize mouseX to layout
        const effectiveX = (mousePos.x + scrollOffsetRef.current) % totalLayoutWidth;

        let currentX = 0;
        for (const msg of messages) {
            const w = getMessageWidth(msg);
            // Check if click falls within this message's width (accounting for scroll wrap conceptually)
            // But simple check:
            if (effectiveX >= currentX && effectiveX <= currentX + w) {
                if (msg.link) {
                    navigate(msg.link);
                }
                break;
            }
            currentX += w + paddingPixels;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-16 rounded-xl cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setMousePos({ x: -1, y: -1 }); }}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            style={{ touchAction: 'none' }}
        />
    );
}
