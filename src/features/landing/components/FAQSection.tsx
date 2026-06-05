export function FAQSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Know About DGE</h2>
                <p className="text-center text-muted-foreground mb-12 text-sm">
                    Get answers to the most common questions about our platform, features, and services.
                </p>

                <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>How do I book a domestic service?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                Simply search for the service you need, choose an available professional, and book a time that works for you.
                            </p>
                        </details>
                    </div>
                    <div className="border rounded-lg p-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Are your service professionals vetted?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                Yes, all our professionals undergo a thorough background check and skill verification process before joining the platform.
                            </p>
                        </details>
                    </div>
                    <div className="border rounded-lg p-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>What if I am not satisfied with the service?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                We offer a satisfaction guarantee. If you're not happy with the work, we'll work with you to make it right or provide a refund.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </section>
    );
}
