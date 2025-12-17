"use client";

import { useEffect, useRef, useState } from "react";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";

export default function ExperienceSection() {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    years: "",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    safetyRating: "",
    customerRating: "",
    ctaText: "",
  });

  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);
  const { showLoader, hideLoader } = useLoader();

  // ---------------------------
  // SAVE CONTENT (Debounced)
  // ---------------------------
  const saveContent = (key: string, value: string) => {
    if (!editMode) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "experience_section",
        type: "text",
      });
    }, 400);
  };

  // ---------------------------
  // Editable Handler (NO CURSOR JUMP)
  // ---------------------------
  const handleEditable = (
    e: any,
    key: string,
    index?: number,
    field?: "value" | "label"
  ) => {
    if (!editMode) return;

    const newValue = e.target.innerText;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      if (key === "stat" && index !== undefined && field) {
        saveContent(`experience_stat_${index + 1}_${field}`, newValue);
      } else {
        saveContent(key, newValue);
      }
    }, 400);
  };

  // ---------------------------
  // Load Edit Mode
  // ---------------------------
  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  // ---------------------------
  // Load Content
  // ---------------------------
  useEffect(() => {
    async function loadContent() {
      showLoader();
      const res = await websiteContentService.getContentBySection(
        "experience_section"
      );

      const d = res.data?.data;

      const stats = [
        {
          value: d["experience_stat_1_value"]?.value || "",
          label: d["experience_stat_1_label"]?.value || "",
        },
        {
          value: d["experience_stat_2_value"]?.value || "",
          label: d["experience_stat_2_label"]?.value || "",
        },
        {
          value: d["experience_stat_3_value"]?.value || "",
          label: d["experience_stat_3_label"]?.value || "",
        },
        {
          value: d["experience_stat_4_value"]?.value || "",
          label: d["experience_stat_4_label"]?.value || "",
        },
      ];

      setContent({
        title: d["experience_title"]?.value || "",
        subtitle: d["experience_subtitle"]?.value || "",
        years: d["experience_years"]?.value || "",
        stats,
        safetyRating: d["experience_safety_rating"]?.value || "",
        customerRating: d["experience_customer_rating"]?.value || "",
        ctaText: d["experience_cta_text"]?.value || "",
      });

      hideLoader();
    }

    loadContent();
  }, []);

  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-600">
                  Our Experience
                </span>
              </div>

              {/* Title */}
              <h2
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "experience_title")}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {content.title}
              </h2>

              {/* Subtitle */}
              <p
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "experience_subtitle")}
                className="text-lg text-gray-600 leading-relaxed mb-8"
              >
                {content.subtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {content.stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleEditable(e, "stat", i, "value")
                    }
                    className="text-2xl font-bold text-blue-600 mb-2"
                  >
                    {s.value}
                  </div>

                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleEditable(e, "stat", i, "label")
                    }
                    className="text-sm text-gray-600"
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) =>
                    handleEditable(e, "experience_cta_text")
                  }
                >
                  {content.ctaText}
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl relative">
                <div className="text-center text-white">
                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "experience_years")}
                    className="text-7xl lg:text-8xl font-black mb-2"
                  >
                    {content.years}
                  </div>

                  <div className="text-lg font-medium tracking-wider">
                    YEARS
                  </div>
                  <div className="text-sm opacity-90">EXPERIENCE</div>
                </div>
                
                <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse"></div>
                <div className="absolute -inset-4 rounded-full border-2 border-blue-300/30"></div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleEditable(e, "experience_safety_rating")
                    }
                    className="text-2xl font-bold text-green-600"
                  >
                    {content.safetyRating}
                  </div>
                  <div className="text-xs text-gray-500">Safety Rating</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-center">
                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) =>
                      handleEditable(e, "experience_customer_rating")
                    }
                    className="text-2xl font-bold text-purple-600"
                  >
                    {content.customerRating}⭐
                  </div>
                  <div className="text-xs text-gray-500">
                    Customer Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
