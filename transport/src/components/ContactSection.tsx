// "use client";

// import { Home, Mail, Smartphone } from "lucide-react";

// export default function ContactSection() {
//   return (
//     <section className="py-16 px-6 md:px-10 lg:px-20 bg-white">
     

//       <div className="
//         grid grid-cols-1 
//         md:grid-cols-2 
//         lg:grid-cols-3 
//         gap-10 max-w-6xl mx-auto
//       ">
//         <div className="bg-white shadow-xl rounded-3xl p-8 text-center hover:scale-[1.02] transition-transform">
//           <div className="flex justify-center mb-6">
//             <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
//               <Home className="h-14 w-14 text-primary" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-semibold mb-4">Address</h3>

//           <p className="text-gray-600 leading-relaxed">
//             ABC Transport Services <br />
//             Sector 12, Transport Nagar<br />
//             New Delhi — 110001
//           </p>
//         </div>

//         <div className="bg-white shadow-xl rounded-3xl p-8 text-center hover:scale-[1.02] transition-transform">
//           <div className="flex justify-center mb-6">
//             <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
//               <Mail className="h-14 w-14 text-primary" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-semibold mb-4">Email Us</h3>

//           <p className="text-gray-600 leading-relaxed">
//             support@transportdemo.com <br />
//             info@logisticscompany.com
//           </p>
//         </div>

//         <div className="bg-white shadow-xl rounded-3xl p-8 text-center hover:scale-[1.02] transition-transform">
//           <div className="flex justify-center mb-6">
//             <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
//               <Smartphone className="h-14 w-14 text-primary" />
//             </div>
//           </div>

//           <h3 className="text-2xl font-semibold mb-4">Call Now</h3>

//           <div className="text-gray-600 leading-relaxed space-y-2">
//             <p>
//               <span className="font-semibold">Customer Support:</span> 
//               &nbsp;+91 98765 43210
//             </p>
//             <p>
//               <span className="font-semibold">Logistics Team:</span> 
//               &nbsp;+91 99887 66554
//             </p>
//             <p>
//               <span className="font-semibold">Booking Desk:</span> 
//               &nbsp;+91 90909 80808
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState, useRef } from "react";
import { Home, Mail, Smartphone } from "lucide-react";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";

export default function ContactSection() {
  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);

  const [content, setContent] = useState({
    address: ["", "", ""],
    emails: ["", ""],
    phones: ["", "", ""],
  });

  const { showLoader, hideLoader } = useLoader();

  const saveContent = (key: string, value: string) => {
    if (!editMode) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "contact_section",
        type: "text",
      });
    }, 350);
  };

  const handleEditable = (e: any, key: string, i: number) => {
    saveContent(key.replace("{i}", i + 1), e.target.innerText);
  };

  useEffect(() => {
    async function loadData() {
      showLoader();
      const res = await websiteContentService.getContentBySection("contact_section");
      const d = res.data.data;

      setContent({
        address: [
          d.contact_address_line1?.value || "",
          d.contact_address_line2?.value || "",
          d.contact_address_line3?.value || "",
        ],
        emails: [
          d.contact_email_1?.value || "",
          d.contact_email_2?.value || "",
        ],
        phones: [
          d.contact_phone_customer?.value || "",
          d.contact_phone_logistics?.value || "",
          d.contact_phone_booking?.value || "",
        ],
      });

      hideLoader();
    }
    loadData();
  }, []);

  useEffect(() => {
    websiteContentService.getEditMode().then((res) =>
      setEditMode(res.data?.edit_mode === "on")
    );
  }, []);

  const cardStyle =
    "bg-white shadow-xl rounded-3xl p-8 text-center border border-gray-100 hover:border-blue-300 hover:shadow-blue-100 hover:shadow-2xl transition-all hover:scale-[1.02]";

  const iconWrapper =
    "w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center shadow-inner";

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {/* ADDRESS CARD */}
        <div className={cardStyle}>
          <div className="flex justify-center mb-6">
            <div className={iconWrapper}>
              <Home className="h-14 w-14 text-blue-600" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Address</h3>

          <p className="text-gray-600 leading-relaxed space-y-1">
            {content.address.map((line, i) => (
              <span
                key={i}
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "contact_address_line{i}", i)}
                className={editMode ? "editable-border block" : "block"}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* EMAIL CARD */}
        <div className={cardStyle}>
          <div className="flex justify-center mb-6">
            <div className={iconWrapper}>
              <Mail className="h-14 w-14 text-blue-600" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Email Us</h3>

          <p className="text-gray-600 leading-relaxed space-y-1">
            {content.emails.map((email, i) => (
              <span
                key={i}
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "contact_email_{i}", i)}
                className={editMode ? "editable-border block" : "block"}
              >
                {email}
              </span>
            ))}
          </p>
        </div>

        {/* PHONE CARD */}
        <div className={cardStyle}>
          <div className="flex justify-center mb-6">
            <div className={iconWrapper}>
              <Smartphone className="h-14 w-14 text-blue-600" />
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Call Now</h3>

          <div className="text-gray-600 leading-relaxed space-y-3">
            {[
              "Customer Support",
              "Logistics Team",
              "Booking Desk",
            ].map((label, i) => (
              <p key={i}>
                <span className="font-semibold text-gray-800">{label}:</span>{" "}
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "contact_phone_{i}", i)}
                  className={editMode ? "editable-border" : ""}
                >
                  {content.phones[i]}
                </span>
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
