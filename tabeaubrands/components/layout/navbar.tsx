"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Science", href: "#science" },
    { name: "Safety", href: "#safety" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    TABeaü-15
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Trigger */}
                <button
                    className="md:hidden text-sm font-bold"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "CLOSE" : "MENU"}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-16 left-0 right-0 border-b border-foreground/10 bg-background p-4 md:hidden shadow-xl"
                >
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
