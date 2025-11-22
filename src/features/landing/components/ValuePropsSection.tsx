import { Card } from "@/components/ui/card";

export function ValuePropsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px] text-center">
                <h2 className="text-3xl font-bold mb-16">Make it all happen with DGE</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { title: "Access a pool of services across 100+ categories", icon: "📦" },
                        { title: "Enjoy a simple, easy-to-use matching experience", icon: "⚡" },
                        { title: "Get quality work done quickly and within budget", icon: "💎" },
                        { title: "Only pay when you're happy", icon: "🛡️" },
                    ].map((item, i) => (
                        <Card key={i} className="p-6 text-left hover:shadow-lg transition-shadow border-none shadow-sm bg-white">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4 text-primary">
                                {item.icon}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
