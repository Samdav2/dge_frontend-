import { Button } from "@/components/ui/button";
import FallbackImage from "@/components/ui/FallbackImage";

export function DrivingSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">

                {/* Banner */}
                <div className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center justify-center mb-20">
                    <div className="absolute inset-0">
                        <FallbackImage
                            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
                            alt="Driving"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 text-center text-white max-w-3xl px-4">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Riding is the new driving</h2>
                        <p className="text-lg md:text-xl mb-8 text-gray-200">
                            Pretium turpis volutpat velit suspendisse tincidunt. Commodo sed faucibus et gravida. Amet diam risus morbi sed enim placerat eu placerat eget.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" className="border-white text-primary hover:bg-white/10 px-8 py-6 rounded-xl">Login</Button>
                            <Button className="bg-[#C69C2E] hover:bg-[#B58B1D] text-white px-8 py-6 rounded-xl">Sign Up</Button>
                        </div>
                    </div>
                </div>

                {/* Earn Money Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Earn money with DEG Driving Service</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join partners and earn with DGE. For drivers, couriers, merchants, and fleet owners looking for new ways to boost revenue.
                    </p>
                </div>

                {/* Feature Blocks */}
                <div className="space-y-20">
                    {/* Block 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="flex-1">
                            <div className="rounded-3xl overflow-hidden shadow-lg">
                                <FallbackImage
                                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Drive and earn"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-4">Drive and earn money</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Our riders will send you plenty of ride requests. When demand is high, you can earn even more.
                            </p>
                            <Button className="bg-[#C69C2E] hover:bg-[#B58B1D] text-white px-8 py-6 rounded-xl">Get Started</Button>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="flex-1 order-2 md:order-1">
                            <h3 className="text-3xl font-bold mb-4">Drive when you want, make what you need</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.
                            </p>
                            <Button className="bg-[#C69C2E] hover:bg-[#B58B1D] text-white px-8 py-6 rounded-xl">Get Started</Button>
                        </div>
                        <div className="flex-1 order-1 md:order-2">
                            <div className="rounded-3xl overflow-hidden shadow-lg">
                                <FallbackImage
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                                    alt="Flexible schedule"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
