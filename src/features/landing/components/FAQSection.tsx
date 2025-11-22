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
                                <span>What is Pod and how does it work?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                Pod is a powerful cloud deployment platform that allows developers to deploy web applications instantly.
                            </p>
                        </details>
                    </div>
                    <div className="border rounded-lg p-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Which programming languages and frameworks does Pod support?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                We support all major frameworks including Next.js, React, Vue, and more.
                            </p>
                        </details>
                    </div>
                    <div className="border rounded-lg p-4">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Does Pod provide database management services?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-muted-foreground mt-3 group-open:animate-fadeIn">
                                Yes, we offer managed database services for PostgreSQL and MySQL.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </section>
    );
}
