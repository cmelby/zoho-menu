"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, AlertTriangle, X } from "lucide-react"
import { motion } from "framer-motion"

export function Comparison() {
    return (
        <section id="science" className="container mx-auto px-4 py-24 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
                    The Science of Purity
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Why TABeaü-15 stands apart from the rest.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* TABeau-15 Column */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full border-2 border-foreground bg-background shadow-lg">
                        <CardHeader className="border-b border-foreground/10 pb-6">
                            <CardTitle className="text-2xl">TABeaü-15</CardTitle>
                            <p className="text-sm font-medium text-muted-foreground">
                                High-Purity MGM-15 (96-99%)
                            </p>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6">
                            {[
                                "Predictable Effects",
                                "Certificate of Analysis Available",
                                "No Residual Solvents",
                                "Consistent Dosage",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Competitors Column */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full border-2 border-foreground/20 bg-foreground/5">
                        <CardHeader className="border-b border-foreground/10 pb-6">
                            <CardTitle className="text-2xl text-muted-foreground">
                                Others
                            </CardTitle>
                            <p className="text-sm font-medium text-muted-foreground">
                                Low-Purity Mixtures
                            </p>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6">
                            {[
                                { text: "Erratic Effects", icon: AlertTriangle },
                                { text: "Unknown Compounds", icon: AlertTriangle },
                                { text: "Contaminant Risk", icon: X },
                                { text: "Inconsistent Potency", icon: X },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20 text-warning">
                                        <item.icon className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">{item.text}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
