export default function TermsAndConditions() {
  return (
    <main className="bg-white text-gray-800">

      {/* HEADER */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-10 leading-relaxed">

        {/* INTRO */}
        <div>
          <p className="text-gray-700">
            These Terms and Conditions ("Terms") govern your access to and use of
            the Truckage Group platform, website, applications, and services
            (collectively, the “Service”). By accessing or using our Service,
            you agree to be bound by these Terms.
          </p>
        </div>

        {/* DEFINITIONS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            1. Definitions
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>"Company"</strong> refers to Truckage Group.</li>
            <li><strong>"User"</strong> refers to any individual or entity using the Service.</li>
            <li><strong>"Platform"</strong> refers to Truckage Group’s software, website, and applications.</li>
            <li><strong>"Services"</strong> include fleet management, load management, POD management, expense tracking, and related tools.</li>
          </ul>
        </div>

        {/* ELIGIBILITY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            2. Eligibility
          </h2>
          <p className="text-gray-700">
            You must be at least 18 years old and legally capable of entering into
            binding contracts to use our Services. By using the Platform, you
            represent and warrant that you meet these requirements.
          </p>
        </div>

        {/* ACCOUNT RESPONSIBILITY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            3. User Accounts & Responsibilities
          </h2>
          <p className="text-gray-700">
            Users are responsible for maintaining the confidentiality of their
            login credentials and all activities performed through their account.
            Truckage Group shall not be liable for any unauthorized access caused
            by user negligence.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            4. Scope of Services
          </h2>
          <p className="text-gray-700 mb-3">
            Truckage Group provides a digital platform for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Truck and fleet management</li>
            <li>Load creation and tracking</li>
            <li>Proof of Delivery (POD) management</li>
            <li>Expense and operational tracking</li>
            <li>Reports and analytics</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Truckage Group does not operate as a transport carrier and does not
            guarantee delivery timelines, cargo safety, or driver performance.
          </p>
        </div>

        {/* PAYMENTS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            5. Payments & Subscriptions
          </h2>
          <p className="text-gray-700">
            Certain features may require paid subscriptions. All fees are non-refundable
            unless explicitly stated. The Company reserves the right to modify pricing
            at any time with prior notice.
          </p>
        </div>

        {/* USER CONDUCT */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            6. Prohibited Use
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Using the platform for unlawful purposes</li>
            <li>Uploading false, misleading, or fraudulent data</li>
            <li>Attempting to hack, disrupt, or misuse the platform</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </div>

        {/* DATA & PRIVACY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            7. Data & Privacy
          </h2>
          <p className="text-gray-700">
            Truckage Group collects and processes data in accordance with its
            Privacy Policy. Users retain ownership of their data but grant the
            Company permission to process it for service delivery.
          </p>
        </div>

        {/* LIMITATION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            To the maximum extent permitted by law, Truckage Group shall not be
            liable for any indirect, incidental, or consequential damages arising
            from the use or inability to use the Services.
          </p>
        </div>

        {/* TERMINATION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            9. Termination
          </h2>
          <p className="text-gray-700">
            Truckage Group reserves the right to suspend or terminate user accounts
            at its sole discretion if these Terms are violated.
          </p>
        </div>

        {/* CHANGES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            10. Changes to Terms
          </h2>
          <p className="text-gray-700">
            The Company may update these Terms from time to time. Continued use of
            the Service after changes constitutes acceptance of the updated Terms.
          </p>
        </div>

        {/* GOVERNING LAW */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            11. Governing Law
          </h2>
          <p className="text-gray-700">
            These Terms shall be governed and interpreted in accordance with the
            laws of India. Any disputes shall be subject to the jurisdiction of
            Indian courts.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            12. Contact Information
          </h2>
          <p className="text-gray-700">
            For questions regarding these Terms, please contact us at:
          </p>
          <p className="text-gray-900 font-medium mt-2">
            info@truckage.com
          </p>
        </div>

      </section>
    </main>
  );
}
