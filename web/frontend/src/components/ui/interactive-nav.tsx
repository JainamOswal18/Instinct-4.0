"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
}

interface InteractiveNavProps {
    items: NavItem[];
    className?: string;
    itemClassName?: string;
    activeColor?: string;
}

export default function InteractiveNav({
    items,
    className,
    itemClassName,
    activeColor = "rgba(0,0,0,0.05)" // Subtle dark overlay for white theme
}: InteractiveNavProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <nav className={cn("flex items-center space-x-2 relative", className)}>
            {items.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                        hoveredId === item.id ? "text-black" : "text-gray-600",
                        itemClassName
                    )}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    {/* Text is rendered above the background because of relative positioning and DOM order? 
              Actually, we need z-index to be safe, but usually non-positioned content is below positioned?
              Wait, the text is content. The pill is absolute. We need pill to be z-0 and text z-10.
          */}
                    <span className="relative z-10">{item.label}</span>

                    {hoveredId === item.id && (
                        <motion.div
                            layoutId="nav-background"
                            className="absolute inset-0 rounded-full z-0"
                            style={{ backgroundColor: activeColor }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 30
                            }}
                        />
                    )}
                </a>
            ))}
        </nav>
    );
}
