"use client";

interface SmallHeroSectionProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function SmallHeroSection({
    title = "Default Title",
    subtitle = "",
    backgroundImage = "/images/1.jpg",
}: SmallHeroSectionProps) {
    return (
        <section className="relative overflow-hidden">
            <div 
                className="absolute inset-0 transform scale-105"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            />
            
            <div className="absolute inset-0 bg-linear-to-br from-black/70 via-blue-900/70 to-black/80"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            
             <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 border border-blue-300/40 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-300/40 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-300/40 rounded-full"></div>
            </div>

            <div className="relative z-10 py-30 lg:py-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                       
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h1>

                        <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed font-light">
                            {subtitle}
                        </p>
                        
                        <nav className="flex justify-center items-center space-x-2 text-white/70 text-sm font-medium">
                            <span className="hover:text-white transition-colors cursor-pointer">Home</span>
                            <span className="text-white/50">/</span>
                            <span className="text-white">{title}</span>
                        </nav>
                    </div>
                </div>
            </div>
            
        </section>
    );
}
