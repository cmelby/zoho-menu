"use client"

import { motion } from "framer-motion"

export function Packaging() {
    return (
        <section className="container mx-auto px-4 py-24 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
                    Closer Look
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Full transparency, right on the pack.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center"
            >
                <div className="relative overflow-hidden rounded-3xl border-2 border-foreground bg-card shadow-xl">
                    <img
                        src="/packaging-detail.jpg"
                        alt="TABeaü-15 Packaging Front and Back"
                        className="h-auto w-full max-w-4xl object-cover"
                    />
                </div>
            </motion.div>
        </section>
    )
}
