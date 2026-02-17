"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "black" | "white"
    icon?: LucideIcon
    children: React.ReactNode
}

export function ModernButton({
    children,
    variant = "black",
    icon: Icon = ChevronRight,
    className,
    ...props
}: ModernButtonProps) {
    const isBlack = variant === "black"

    return (
        <motion.button
            className={cn(
                "group relative flex items-center justify-between rounded-full cursor-pointer overflow-hidden",
                "h-14 w-full",
                isBlack ? "bg-black" : "bg-white border border-gray-200",
                className
            )}
            initial="idle"
            whileHover="hover"
            animate="idle"
            variants={{
                idle: {
                    backgroundColor: isBlack ? "#000000" : "#ffffff",
                    paddingLeft: "24px",
                    paddingRight: "6px"
                },
                hover: {
                    backgroundColor: "#fa5502", // Vivid Orange from Framer
                    paddingLeft: "6px",
                    paddingRight: "24px"
                }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            {...props as any}
        >
            {/* Text */}
            <motion.span
                className="text-lg font-medium whitespace-nowrap z-10"
                variants={{
                    idle: { order: 1, color: isBlack ? "#ffffff" : "#000000" },
                    hover: { order: 2, color: "#ffffff" }
                }}
                layout
            >
                {children}
            </motion.span>

            {/* Icon Wrapper */}
            <motion.div
                className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full z-10 shadow-sm",
                    isBlack ? "bg-white" : "bg-black"
                )}
                variants={{
                    idle: { order: 2 },
                    hover: { order: 1, backgroundColor: "#ffffff" }
                }}
                layout
            >
                <Icon className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    isBlack ? "text-black" : "text-white",
                    "group-hover:text-[#fa5502]"
                )} />
            </motion.div>
        </motion.button>
    )
}
