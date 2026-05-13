import { Button } from "@/components/ui/button";
import FallbackImage from "@/components/ui/FallbackImage";

export function AboutUsSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                <div className="bg-[#FFFBF0] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6">About Us</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Malesuada nisl ultricies volutpat suspendisse aliquet. Mus at justo nullam tortor bibendum vitae posuere etiam. Auctor tincidunt quam habitant faucibus arcu. Egestas orci etiam dignissim sapien eget proin vitae justo curae.
                        </p>
                        <Button variant="default" className="bg-[#C69C2E] hover:bg-[#B58B1D] text-white">Get Started</Button>
                    </div>
                    <div className="flex-1">
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <FallbackImage
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                                alt="About Us"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
