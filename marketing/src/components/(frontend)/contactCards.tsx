import { FaHome, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Heading from "../ui/heading";

export default function ContactCards() {
  const items = [
    {
      title: "Head Office",
      icon: <FaHome className="text-primary w-10 h-10" />,
      content: (
        <>
          <p>123 Digital Park Avenue</p>
          <p>Sector 21, New Delhi</p>
          <p>110011</p>
        </>
      ),
    },

    {
      title: "Email Support",
      icon: <FaEnvelope className="text-primary w-10 h-10" />,
      content: (
        <>
          <p>support@example.com</p>
          <p>hello@example.com</p>
        </>
      ),
    },

    {
      title: "Customer Care",
      icon: <FaPhoneAlt className="text-primary w-10 h-10" />,
      content: (
        <>
          <p><strong>Office:</strong> +91 98765 43210</p>
          <p><strong>Support:</strong> +91 91234 56789</p>
          <p><strong>Helpline:</strong> +91 90000 11111</p>
        </>
      ),
    },
  ];

  return (
    <>
    <Heading
      title="Contact Information Cards"
      description="Reach out to us through any of the following contact methods. We're here to assist you."
      align="center"
    />
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="
              bg-white rounded-3xl p-10 shadow-lg
              border border-gray-100
              flex flex-col items-center text-center
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-2
            "
          >
            {/* Icon Background */}
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h3>

            {/* Content */}
            <div className="text-gray-600 space-y-1">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
