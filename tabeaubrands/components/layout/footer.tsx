import Link from "next/link"

export function Footer() {
    return (
        <footer id="contact" className="border-t border-foreground/10 bg-background py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter">TABeaü-15</h3>
                        <p className="text-sm text-muted-foreground">
                            Modern alkaloids for the modern mind.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-bold">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="mailto:sales@tabeaubrands.com" className="hover:underline">
                                    sales@tabeaubrands.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:815-206-8217" className="hover:underline">
                                    815-206-8217
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="mb-4 font-bold text-warning">Disclaimer</h4>
                        <div className="space-y-2 text-xs text-muted-foreground">
                            <p>For Adult Use Only (18+/21+ depending on jurisdiction).</p>
                            <p>
                                This product has not been evaluated by the Food and Drug Administration.
                                This product is not intended to diagnose, treat, cure, or prevent any disease.
                            </p>
                            <p>
                                Do not use if pregnant, nursing, or operating heavy machinery.
                                Consult a healthcare professional before use.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 md:flex-row text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} TABeau Brands. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
