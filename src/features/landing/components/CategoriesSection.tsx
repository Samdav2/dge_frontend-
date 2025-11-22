import { Card } from "@/components/ui/card";
import { Search, Code, PenTool, Megaphone, Video, Wrench } from "lucide-react";

export function CategoriesSection() {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { icon: Code, label: "Programming & Tech" },
                        { icon: PenTool, label: "Graphics & Design" },
                        { icon: Megaphone, label: "Digital Marketing" },
                        { icon: Wrench, label: "Writing & Translation" },
                        { icon: Video, label: "Video & Animation" },
                        { icon: Search, label: "AI Services" },
                    ].map((cat, i) => (
                        <Card key={i} className="p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer border-border/50 bg-card/50">
                            <div className="p-3 rounded-full bg-gray-100 text-primary">
                                <cat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-medium text-center">{cat.label}</span>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
