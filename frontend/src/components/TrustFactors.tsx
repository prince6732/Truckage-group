"use client";

import { useEffect, useRef, useState } from "react";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";

export default function TrustFactors() {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    factors: Array(6).fill({
      stat: "",
      unit: "",
      title: "",
      desc: "",
    }),
    bottomText: "",
  });

  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);
  const { showLoader, hideLoader } = useLoader();

  // SAVE (debounced)
  const saveContent = (key: string, value: string) => {
    if (!editMode) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "trust_factors",
        type: "text",
      });
    }, 400);
  };

  const handleEditable = (e: any, key: string, index?: number, field?: string) => {
    if (!editMode) return;

    const newValue = e.target.innerText;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      if (key === "factor" && index !== undefined && field) {
        saveContent(`trust_factor_${index + 1}_${field}`, newValue);
      } else {
        saveContent(key, newValue);
      }
    }, 400);
  };

  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  useEffect(() => {
    async function loadContent() {
      showLoader();
      const res = await websiteContentService.getContentBySection("trust_factors");
      const d = res.data?.data;

      const factors = [];
      for (let i = 1; i <= 6; i++) {
        factors.push({
          stat: d[`trust_factor_${i}_stat`]?.value || "",
          unit: d[`trust_factor_${i}_unit`]?.value || "",
          title: d[`trust_factor_${i}_title`]?.value || "",
          desc: d[`trust_factor_${i}_desc`]?.value || "",
        });
      }

      setContent({
        title: d["trust_title"]?.value || "",
        subtitle: d["trust_subtitle"]?.value || "",
        factors,
        bottomText: d["trust_bottom_text"]?.value || "",
      });

      hideLoader();
    }

    loadContent();
  }, []);

  return (
    <section className="w-full bg-linear-to-br from-blue-50 to-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-6 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm font-medium text-blue-600">Trust Factors</span>
          </div>

          <h2
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "trust_title")}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {content.title}
          </h2>

          <p
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "trust_subtitle")}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.factors.map((f, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-200"
            >
              <div className="text-center mb-6">
                <div
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "factor", i, "stat")}
                  className="text-4xl font-bold text-blue-600 mb-2"
                >
                  {f.stat}
                </div>

                <div
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "factor", i, "unit")}
                  className="text-sm text-gray-500 uppercase tracking-wide"
                >
                  {f.unit}
                </div>
              </div>

              <div className="text-center">
                <h3
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "factor", i, "title")}
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                >
                  {f.title}
                </h3>

                <p
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "factor", i, "desc")}
                  className="text-gray-600 leading-relaxed"
                >
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 h-1 w-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full group-hover:w-full transition-all duration-500 mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "trust_bottom_text")}
                className="text-sm font-medium text-gray-700"
              >
                {content.bottomText}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
