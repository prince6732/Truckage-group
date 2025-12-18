"use client";

import { useEffect, useRef, useState } from "react";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";
import { FiTruck, FiClock, FiShield, FiTarget, FiStar, FiUsers, FiPackage } from "react-icons/fi";

export default function Services() {
  const [content, setContent] = useState({
    mainTitle: "",
    mainSubtitle: "",
    rightTitle: "",
    rightDescription: "",
    primaryCta: "",
    secondaryCta: "",
    mainImage: "/images/4.jpg",
    experienceValue: "",
    experienceLabel: "",
    features: ["", "", "", ""],
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);
  const { showLoader, hideLoader } = useLoader();

  // ---------------------------------
  // SAVE TO DATABASE
  // ---------------------------------
  const saveContent = (key: string, value: string) => {
    if (!editMode) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "services_section",
        type: "text",
      });
    }, 500);
  };

  // ---------------------------------
  // KEY MAP
  // ---------------------------------
  const keyToDb: any = {
    mainTitle: "services_main_title",
    mainSubtitle: "services_main_subtitle",
    rightTitle: "services_right_title",
    rightDescription: "services_right_description",
    primaryCta: "services_primary_cta",
    secondaryCta: "services_secondary_cta",
    experienceValue: "services_experience_value",
    experienceLabel: "services_experience_label",
  };

  // ---------------------------------
  // PERFECT EDITABLE HANDLER (LIKE HERO SLIDER)
  // ---------------------------------
  const handleEditable = (e: any, key: string, index?: number, field?: string) => {
    if (!editMode) return;

    const newValue = e.target.innerText; // DOM controls typing

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      if (key === "feature") {
        saveContent(`service_feature_${index! + 1}`, newValue);
      } else if (key === "stat") {
        saveContent(`services_stat_${index! + 1}_${field}`, newValue);
      } else {
        saveContent(keyToDb[key], newValue);
      }
    }, 350);
  };

  // ---------------------------------
  // EDIT MODE
  // ---------------------------------
  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  // ---------------------------------
  // LOAD CONTENT
  // ---------------------------------
  useEffect(() => {
    async function loadContent() {
      showLoader();
      const res = await websiteContentService.getContentBySection("services_section");
      const d = res.data?.data;

      setContent({
        mainTitle: d.services_main_title?.value || "",
        mainSubtitle: d.services_main_subtitle?.value || "",
        rightTitle: d.services_right_title?.value || "",
        rightDescription: d.services_right_description?.value || "",
        primaryCta: d.services_primary_cta?.value || "",
        secondaryCta: d.services_secondary_cta?.value || "",
        mainImage: d.services_main_image?.value || "/images/4.jpg",
        experienceValue: d.services_experience_value?.value || "",
        experienceLabel: d.services_experience_label?.value || "",
        features: [
          d.service_feature_1?.value || "On-Time Delivery Guaranteed",
          d.service_feature_2?.value || "Real-Time Tracking System",
          d.service_feature_3?.value || "Secure Cargo Protection",
          d.service_feature_4?.value || "24/7 Customer Support",
        ],
        stats: [
          { value: d.services_stat_1_value?.value || "98%", label: d.services_stat_1_label?.value || "On-Time Delivery" },
          { value: d.services_stat_2_value?.value || "2.5K+", label: d.services_stat_2_label?.value || "Happy Clients" },
          { value: d.services_stat_3_value?.value || "4.9★", label: d.services_stat_3_label?.value || "Rating" },
        ],
      });

      hideLoader();
    }

    loadContent();
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-linear-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Our Services Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-5 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-medium text-blue-600">
              Our Services
            </span>
          </div>
        </div>

        <div className="text-center mb-16 sm:mb-20">
          <h2
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "mainTitle")}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight ${editMode ? "editable-border" : ""}`}
          >
            {content.mainTitle}
          </h2>

          <p
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={(e) => handleEditable(e, "mainSubtitle")}
            className={`text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed ${editMode ? "editable-border" : ""}`}
          >
            {content.mainSubtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-tr from-indigo-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
            
            <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src={content.mainImage}
                alt="Services"
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px] xl:h-[500px] object-cover"
              />
              
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-indigo-500/10"></div>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-xl border border-white/20">
              <div
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "experienceValue")}
                className={`text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 ${editMode ? "editable-border" : ""}`}
              >
                {content.experienceValue}
              </div>
              <div
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "experienceLabel")}
                className={`text-xs sm:text-sm text-gray-600 font-medium ${editMode ? "editable-border" : ""}`}
              >
                {content.experienceLabel}
              </div>
            </div>
          </div>

        <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
          <div className="space-y-4 sm:space-y-6">
            <h3
              contentEditable={editMode}
              suppressContentEditableWarning
              onInput={(e) => handleEditable(e, "rightTitle")}
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ${editMode ? "editable-border" : ""}`}
            >
              {content.rightTitle}
            </h3>

            <p
              contentEditable={editMode}
              suppressContentEditableWarning
              onInput={(e) => handleEditable(e, "rightDescription")}
              className={`text-base sm:text-lg text-gray-600 leading-relaxed ${editMode ? "editable-border" : ""}`}
            >
              {content.rightDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.features.map((f, i) => {
              const icons = [<FiClock key="clock" />, <FiPackage key="package" />, <FiShield key="shield" />, <FiTarget key="target" />];
              
              return (
                <div key={i} className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg text-xl">
                      {icons[i]}
                    </div>
                    <span
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      onInput={(e) => handleEditable(e, "feature", i)}
                      className={`text-base font-medium text-black ${editMode ? "editable-border" : ""}`}
                    >
                      {f || `Feature ${i + 1}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LIGHT STATS */}
          <div className="p-6">
            <div className="grid grid-cols-3 text-center">
              {content.stats.map((s, i) => {
                const statIcons = [<FiClock key="clock" />, <FiUsers key="users" />, <FiStar key="star" />];
                
                return (
                  <div key={i} className="px-4">
                    <div className="flex flex-col items-center">
                      <div className="text-xl mb-2 text-blue-600">
                        {statIcons[i]}
                      </div>
                      <div
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onInput={(e) => handleEditable(e, "stat", i, "value")}
                        className={`text-2xl font-bold text-black mb-1 ${editMode ? "editable-border" : ""}`}
                      >
                        {s.value || "0"}
                      </div>
                      <div
                        contentEditable={editMode}
                        suppressContentEditableWarning
                        onInput={(e) => handleEditable(e, "stat", i, "label")}
                        className={`text-sm text-gray-600 font-medium ${editMode ? "editable-border" : ""}`}
                      >
                        {s.label || "Metric"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "primaryCta")}
                className={editMode ? "editable-border" : ""}
              >
                {content.primaryCta || "Get Quote"}
              </span>
            </button>

            <button className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "secondaryCta")}
                className={editMode ? "editable-border" : ""}
              >
                {content.secondaryCta || "Learn More"}
              </span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
