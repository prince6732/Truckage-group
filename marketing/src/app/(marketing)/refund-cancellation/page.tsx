export default function RefundCancellationPolicy() {
  return (
    <main className="bg-white text-gray-800">

      {/* HEADER */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12 leading-relaxed">

        {/* DISCLAIMER & WARRANTIES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Disclaimers & Warranties
          </h2>

          <p className="text-gray-700 mb-4">
            The use of the services provided by Truckage Group (“Company”) is at
            your sole risk. The services are provided on an “as is” and “as
            available” basis.
          </p>

          <p className="text-gray-700 mb-4">
            You acknowledge and agree that the Company is a technology platform
            service provider and is not engaged in the provision, grant, or
            disbursement of any financial product. The Company does not act as a
            financial intermediary and does not collect, hold, or facilitate the
            collection of funds on behalf of users.
          </p>

          <p className="text-gray-700 mb-4">
            The Company is not registered with the Reserve Bank of India (RBI),
            does not hold any license to engage in financial activities, and is
            not a financial institution under the Companies Act, 2013, the
            Banking Regulation Act, 1949, or any other applicable laws in India.
          </p>

          <p className="text-gray-700">
            The Company shall not be responsible or liable for any claims,
            damages, losses, or disputes arising directly or indirectly from
            payments made by users or their customers. Users are solely
            responsible for maintaining proof of sale or transaction records in
            electronic or physical form.
          </p>
        </div>

        {/* NO WARRANTY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No Warranty
          </h2>
          <p className="text-gray-700">
            To the fullest extent permitted by applicable law, the Company
            expressly disclaims all warranties of any kind, whether express or
            implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, accuracy,
            reliability, non-infringement, or uninterrupted service.
          </p>
        </div>

        {/* LIMITATION OF LIABILITY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            The Company, its affiliates, directors, officers, employees, or
            agents shall not be liable for any indirect, incidental, special, or
            consequential damages, including loss of profits, revenue, or data,
            arising out of or related to your use of the services.
          </p>

          <p className="text-gray-700">
            You agree to waive, release, and hold harmless the Company from any
            claims arising from your use or inability to use the services.
          </p>
        </div>

        {/* INDEMNITY */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Indemnity
          </h2>
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless the Company, its
            affiliates, directors, officers, employees, and agents from any
            claims, damages, losses, liabilities, costs, or expenses arising out
            of your access to or use of the services, violation of these terms,
            or infringement of any third-party rights.
          </p>
        </div>

        {/* CONSENT TO USE DATA */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Consent to Use Data
          </h2>
          <p className="text-gray-700 mb-3">
            You agree that the Company may collect, use, and process your data in
            accordance with its Privacy Policy for service delivery, analytics,
            performance improvement, and compliance with legal obligations.
          </p>

          <p className="text-gray-700">
            The Company may disclose user data to law enforcement or government
            authorities if required under applicable laws.
          </p>
        </div>

        {/* MAINTENANCE OF RECORDS */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Maintenance of Records
          </h2>
          <p className="text-gray-700">
            Users are required to maintain independent records of all payment
            transactions. The Company reserves the right to request copies of
            such records for audit or compliance purposes.
          </p>
        </div>

        {/* FEES */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Fees & Charges
          </h2>
          <p className="text-gray-700">
            The Company reserves the right to charge subscription fees or
            convenience fees for the services. Failure to pay applicable fees
            may result in suspension or termination of access.
          </p>
        </div>

        {/* REFUND & CANCELLATION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Cancellation & Refund Policy
          </h2>

          <h3 className="font-semibold text-gray-900 mt-4 mb-2">
            UPI Transactions
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>UPI transactions cannot be cancelled once initiated.</li>
            <li>If incorrect UPI ID or mobile number is entered, the Company shall not be liable.</li>
            <li>UPI transactions are real-time. In case of delay, users may contact support after a 30-minute cooling period.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-6 mb-2">
            Debit / Credit Card Transactions
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Users must report card-related transaction issues via email support.</li>
            <li>The Company will review and attempt resolution based on escalation procedures.</li>
            <li>Refunds, if applicable, will be processed after transaction validation on a case-by-case basis.</li>
            <li>Refund timelines depend on banking partners and applicable laws.</li>
          </ul>
        </div>

        {/* JURISDICTION */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Jurisdiction & Dispute Resolution
          </h2>
          <p className="text-gray-700 mb-3">
            These terms shall be governed by and construed in accordance with the
            laws of India. Courts located in Bangalore shall have exclusive
            jurisdiction.
          </p>

          <p className="text-gray-700">
            Any disputes shall be resolved through arbitration in Bangalore in
            accordance with the Arbitration and Conciliation Act, 1996. The
            arbitration shall be conducted in English and the decision shall be
            final and binding.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Contact Information
          </h2>
          <p className="text-gray-700">
            For refund, cancellation, or legal queries, please contact:
          </p>
          <p className="font-medium text-gray-900 mt-2">
            📧 dev@transportbook.in
          </p>
        </div>

      </section>
    </main>
  );
}
