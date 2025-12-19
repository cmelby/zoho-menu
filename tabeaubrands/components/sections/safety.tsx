"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FileText, ShieldCheck } from "lucide-react"

export function Safety() {
    return (
        <section id="safety" className="bg-foreground text-background py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
                            Transparency is <br /> our Formula.
                        </h2>
                        <p className="mt-6 text-lg text-background/80">
                            We believe in radical transparency. Every batch is tested by third-party labs to ensure purity, potency, and safety.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <a href="/coa.pdf" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Certificate of Analysis
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl border-2 border-background bg-background/5 p-8"
                    >
                        <div className="absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground">
                            <ShieldCheck className="h-8 w-8" />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between border-b border-background/20 pb-4">
                                <span className="font-mono text-sm uppercase tracking-widest">Analyte</span>
                                <span className="font-mono text-sm uppercase tracking-widest">Result</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">MGM-15 Purity</span>
                                <span className="font-mono font-bold text-green-400">96.24%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Heavy Metals</span>
                                <span className="font-mono text-green-400">PASS</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Residual Solvents</span>
                                <span className="font-mono text-green-400">PASS</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Microbials</span>
                                <span className="font-mono text-green-400">PASS</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-xs text-background/60">
                            * Lab results available for every batch number.
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
