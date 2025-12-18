export default function PrivacyPolicy() {
  return (
    <main className="bg-white text-gray-800">

      {/* HEADER */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
            Truckage Group ("Company", "we", "our", or "us") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our website, applications, and services (collectively, the
            “Platform”).
          </p>
        </div>

        {/* INFORMATION COLLECTED */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            1. Information We Collect
          </h2>

          <h3 className="font-semibold text-gray-900 mb-2">
            a. Personal Information
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Name, email address, phone number</li>
            <li>Company or business information</li>
            <li>Login credentials and account details</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mb-2">
            b. Usage & Technical Data
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>IP address, browser type, device information</li>
            <li>Log files, access times, pages viewed</li>
            <li>Location data (if enabled by the user)</li>
          </ul>
        </div>

        {/* USE OF INFORMATION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To provide and maintain the Platform and services</li>
            <li>To manage user accounts and customer support</li>
            <li>To improve platform functionality and user experience</li>
            <li>To send service-related notifications and updates</li>
            <li>To comply with legal and regulatory obligations</li>
          </ul>
        </div>

        {/* SHARING */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            3. Sharing of Information
          </h2>
          <p className="text-gray-700 mb-3">
            We do not sell or rent your personal information. We may share data
            only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>With trusted third-party service providers</li>
            <li>To comply with legal obligations or government requests</li>
            <li>To protect the rights, safety, or property of the Company or users</li>
          </ul>
        </div>

        {/* DATA SECURITY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-700">
            We implement reasonable technical and organizational security
            measures to protect your data. However, no method of transmission
            over the internet or electronic storage is completely secure.
          </p>
        </div>

        {/* DATA RETENTION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            5. Data Retention
          </h2>
          <p className="text-gray-700">
            We retain personal data only for as long as necessary to fulfill the
            purposes outlined in this Policy or as required by law.
          </p>
        </div>

        {/* USER RIGHTS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            6. User Rights
          </h2>
          <p className="text-gray-700 mb-3">
            Users have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access and update their personal information</li>
            <li>Request deletion of their account and data</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </div>

        {/* COOKIES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            7. Cookies & Tracking Technologies
          </h2>
          <p className="text-gray-700">
            We use cookies and similar technologies to enhance user experience,
            analyze usage trends, and improve platform performance. Users may
            disable cookies through browser settings.
          </p>
        </div>

        {/* THIRD PARTY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            8. Third-Party Services
          </h2>
          <p className="text-gray-700">
            Our Platform may contain links to third-party services. We are not
            responsible for the privacy practices of such third parties.
          </p>
        </div>

        {/* CHANGES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Continued use of
            the Platform after changes indicates acceptance of the updated
            Policy.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            10. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="font-medium text-gray-900 mt-2">
            info@truckage.in
          </p>
        </div>

      </section>
    </main>
  );
}
