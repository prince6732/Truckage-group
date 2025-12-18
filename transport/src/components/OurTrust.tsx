"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiShield,
  FiClock,
  FiStar,
  FiGlobe,
  FiNavigation,
  FiTruck,
} from "react-icons/fi";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";

export default function OurTrust() {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    items: Array(6).fill({ title: "", desc: "" }),
    indicators: ["", "", ""],
  });

  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);
  const { showLoader, hideLoader } = useLoader();

  const iconList = [FiClock, FiShield, FiStar, FiGlobe, FiNavigation, FiTruck];

  // -----------------------------
  // AUTO SAVE (NO CURSOR JUMP)
  // -----------------------------
  const saveContent = (key: string, value: string) => {
    if (!editMode) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "why_choose_us",
        type: "text",
      });
    }, 500);
  };

  // -----------------------------
  // MAIN EDITABLE HANDLER (same as MainSlider)
  // -----------------------------
  const handleEditable = (
    e: any,
    key: string,
    index?: number,
    field?: "title" | "desc"
  ) => {
    if (!editMode) return;
    const newValue = e.target.innerText; // ONLY READ DOM VALUE — DO NOT SET STATE HERE

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      // Single rules just like MainSlider
      if (key === "item" && index !== undefined && field) {
        saveContent(`why_item_${index + 1}_${field}`, newValue);
      } else if (key === "indicator" && index !== undefined) {
        saveContent(`why_indicator_${index + 1}`, newValue);
      } else {
        saveContent(key, newValue);
      }
    }, 400);
  };

  // -----------------------------
  // LOAD EDIT MODE
  // -----------------------------
  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  // -----------------------------
  // LOAD CONTENT
  // -----------------------------
  useEffect(() => {
    async function loadContent() {
      showLoader();
      const res = await websiteContentService.getContentBySection(
        "why_choose_us"
      );
      const d = res.data?.data;

      const items: any[] = [];
      for (let i = 1; i <= 6; i++) {
        items.push({
          title: d[`why_item_${i}_title`]?.value || "",
          desc: d[`why_item_${i}_desc`]?.value || "",
        });
      }

      const indicators = [
        d["why_indicator_1"]?.value || "",
        d["why_indicator_2"]?.value || "",
        d["why_indicator_3"]?.value || "",
      ];

      setContent({
        title: d["whychoose_title"]?.value || "",
        subtitle: d["whychoose_subtitle"]?.value || "",
        items,
        indicators,
      });

      hideLoader();
    }

    loadContent();
  }, []);

  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-5 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-600">
              Why Choose Us
            </span>
          </div>

          <h2
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "whychoose_title")}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            {content.title}
          </h2>

          <p
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "whychoose_subtitle")}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {content.subtitle}
          </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item, i) => {
            const Icon = iconList[i];

            return (
              <div
                key={i}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-blue-100"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "item", i, "title")}
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600"
                >
                  {item.title}
                </h3>

                <p
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "item", i, "desc")}
                  className="text-gray-600 leading-relaxed"
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            {content.indicators.map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    i === 0
                      ? "bg-green-500"
                      : i === 1
                      ? "bg-blue-500"
                      : "bg-purple-500"
                  }`}
                ></div>

                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditable(e, "indicator", i)}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
