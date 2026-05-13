import Link from "next/link";
import { Button } from "@/components/ui/button";
import FallbackImage from "@/components/ui/FallbackImage";

export function JobListingSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                <div className="bg-[#FFFBF0] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <FallbackImage
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                                alt="Job Listing"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex-1 order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-6">Make an incredible <br /> Job listing in seconds</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Malesuada nisl ultricies volutpat suspendisse aliquet. Mus at justo nullam tortor bibendum vitae posuere etiam. Auctor tincidunt quam habitant faucibus arcu.
                        </p>
                        <Link href="/register">
                            <Button variant="default" className="bg-[#C69C2E] hover:bg-[#B58B1D] text-white">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
