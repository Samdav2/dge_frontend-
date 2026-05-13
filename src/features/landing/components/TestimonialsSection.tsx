import { Card } from "@/components/ui/card";
import FallbackImage from "@/components/ui/FallbackImage";

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((_, i) => (
                        <Card key={i} className="p-6 border shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <FallbackImage src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Okunade-Praise Peculiar</h4>
                                    <p className="text-xs text-muted-foreground">Client from Nigeria</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground italic">
                                &quot;Pod stands out with its speed, accuracy, and security. I&apos;ve been using it since the MVP stage, and the recent updates have made building dApps 100% faster.&quot;
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
