import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-green-700">Truckage Group</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Truckage Group is a modern logistics and fleet management platform
            designed to simplify transportation operations, improve visibility,
            and reduce operational costs for transport businesses of all sizes.
          </p>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Truckage Group is built to solve real-world logistics problems.
            We help transport companies, fleet owners, and logistics providers
            manage their day-to-day operations efficiently using one powerful platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our system centralizes fleet tracking, load handling, proof of delivery,
            expense monitoring, and operational analytics — eliminating manual work
            and improving transparency across the supply chain.
          </p>
        </div>

        <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <Image
            src="/about/fleet.jpg"
            alt="Fleet Management"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* WHAT WE MANAGE */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-14">
            What Truckage Helps You Manage
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Load Management",
                desc: "Create, assign, and track loads in real time with complete visibility from pickup to delivery.",
                image: "/about/load.jpg",
              },
              {
                title: "POD Management",
                desc: "Digitally upload, verify, and store Proof of Delivery documents securely.",
                image: "/about/pod.jpg",
              },
              {
                title: "Expense Management",
                desc: "Track fuel, tolls, maintenance, and driver expenses with accurate reporting.",
                image: "/about/expense.jpg",
              },
              {
                title: "Truck Management",
                desc: "Maintain truck details, documents, service schedules, and availability.",
                image: "/about/truck.jpg",
              },
              {
                title: "Driver Management",
                desc: "Manage drivers, assign trips, track performance, and ensure compliance.",
                image: "/about/driver.jpg",
              },
              {
                title: "Fleet Analytics",
                desc: "Get actionable insights with dashboards and operational analytics.",
                image: "/about/analytics.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to digitize logistics operations and empower
            transport businesses with technology that improves efficiency,
            reduces costs, and drives growth.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where logistics operations are fully transparent,
            data-driven, and automated — helping businesses scale faster and smarter.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Modern Transport Businesses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you manage a small fleet or a large logistics operation,
            Truckage Group gives you the tools to stay in control.
          </p>

          <button className="px-8 py-3 rounded-xl font-medium text-white 
            bg-linear-to-r from-green-700 to-green-600 
            hover:from-green-800 hover:to-green-700 transition">
            Get Started with Truckage
          </button>
        </div>
      </section>

    </main>
  );
}
