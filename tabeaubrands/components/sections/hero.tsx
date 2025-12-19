"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 md:px-6">
            <div className="container grid gap-12 md:grid-cols-2 md:items-center">
                <div className="flex flex-col items-start gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
                    >
                        Purity in <br /> Every Dose.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="max-w-[600px] text-lg text-muted-foreground md:text-xl"
                    >
                        Modern alkaloids crafted for balance, clarity, and control—without
                        compromise.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button variant="outline" size="lg" className="group border-foreground hover:bg-foreground hover:text-background">
                            View the Science
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>
                <div className="flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100,
                        }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="relative h-auto w-[450px] md:w-[600px]"
                    >
                        <img
                            src="/product.jpg"
                            alt="TABeaü-15 Packaging"
                            className="h-full w-full rounded-3xl object-contain shadow-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
