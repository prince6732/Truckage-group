"use client";

export default function SmallHeroSection({
    title = "Default Title",
    subtitle = "Default subtitle goes here.",
    backgroundImage = "https://picsum.photos/seed/33/600/400",
}) {
    return (
        <section
            className="relative text-white py-12 sm:py-16 md:py-20 "
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-900/80 via-slate-900/80 to-slate-800/80"></div>

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                        {title}
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl opacity-90 px-4">
                        {subtitle}
                    </p>
                </div>
            </div>
        </section>
    );
}
