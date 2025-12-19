"use client"

import { motion } from "framer-motion"

const marqueeText = [
    "100% NATURAL ALKALOIDS",
    "NO SYNTHETIC CHEMICALS",
    "MADE IN USA",
    "DOMESTIC FOOD GRADE SOURCE",
    "NO FILLERS",
]

export function Marquee() {
    return (
        <div className="relative flex w-full overflow-hidden border-y border-foreground bg-foreground py-4 text-background">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                    className="flex gap-8"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-8">
                            {marqueeText.map((text, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-8 text-lg font-bold tracking-widest uppercase md:text-xl"
                                >
                                    {text}
                                    <span className="h-2 w-2 rounded-full bg-background" />
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
