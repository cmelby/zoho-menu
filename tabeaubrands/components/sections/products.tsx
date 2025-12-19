"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "lucide-react"

const products = [
    { flavor: "Lemon Mint", dosage: "5mg", count: "6ct", color: "bg-yellow-100" },
    { flavor: "Mint", dosage: "10mg", count: "2ct", color: "bg-green-100" },
    { flavor: "Mixed Berry", dosage: "15mg", count: "2ct", color: "bg-purple-100" },
    { flavor: "Strawberry", dosage: "25mg", count: "4ct", color: "bg-red-100" },
]

export function Products() {
    return (
        <section id="products" className="container mx-auto px-4 py-24 md:px-6">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">
                    The Collection
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Precision-dosed for your needs.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="group relative"
                    >
                        <Card className="h-full overflow-hidden border-2 border-foreground bg-card transition-colors hover:border-foreground">
                            <div className={`h-32 w-full ${product.color} flex items-center justify-center border-b-2 border-foreground`}>
                                <span className="text-4xl font-bold opacity-20">{product.dosage}</span>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {product.flavor}
                                    <span className="text-sm font-normal text-muted-foreground border border-foreground px-2 py-0.5 rounded-full">
                                        {product.count}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{product.dosage}</p>
                                <p className="text-sm text-muted-foreground">MGM-15 Alkaloid</p>
                            </CardContent>

                            {/* Hover Reveal Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-foreground/90 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <p className="text-center font-medium text-background">
                                    Suggested Use: <br />
                                    Take 1/2 chewable tablet every 6 hours.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
