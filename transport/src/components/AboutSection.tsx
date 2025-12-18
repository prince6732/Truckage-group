"use client";

import { useEffect, useRef, useState } from "react";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";

export default function AboutSection() {
  const [editMode, setEditMode] = useState(false);
  const saveTimeout = useRef<any>(null);

  const [content, setContent] = useState({
    badge: "",
    title1: "",
    title2: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    stats: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
  });

  const keyMap: any = {
    badge: "about_badge",
    title1: "about_title_line_1",
    title2: "about_title_line_2",
    paragraph1: "about_paragraph_1",
    paragraph2: "about_paragraph_2",
    paragraph3: "about_paragraph_3",
  };

  const saveContent = (key: string, value: string) => {
    if (!editMode) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "about_section",
        type: "text",
      });
    }, 400);
  };

  const handleEditable = (e: any, key: string, i?: number, field?: string) => {
    const value = e.target.innerText;

    if (i !== undefined) {
      saveContent(`about_stat_${i + 1}_${field}`, value);
      return;
    }

    saveContent(keyMap[key], value);
  };

  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    async function load() {
      showLoader();
      const res = await websiteContentService.getContentBySection("about_section");
      const d = res.data.data;

      setContent({
        badge: d.about_badge?.value || "",
        title1: d.about_title_line_1?.value || "",
        title2: d.about_title_line_2?.value || "",
        paragraph1: d.about_paragraph_1?.value || "",
        paragraph2: d.about_paragraph_2?.value || "",
        paragraph3: d.about_paragraph_3?.value || "",
        stats: [
          { value: d.about_stat_1_value?.value, label: d.about_stat_1_label?.value },
          { value: d.about_stat_2_value?.value, label: d.about_stat_2_label?.value },
          { value: d.about_stat_3_value?.value, label: d.about_stat_3_label?.value },
          { value: d.about_stat_4_value?.value, label: d.about_stat_4_label?.value },
        ],
      });

      hideLoader();
    }
    load();
  }, []);

  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-linear-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* LEFT SIDE IMAGE (NO EDIT OPTION) */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl bg-linear-to-br from-orange-100 to-blue-100">
              <img
                src="/images/about-truck.jpg"
                alt="Professional Transport Truck - BABA SADHU JI Transport Service"
                className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover transition-all duration-500 hover:scale-105"
                onError={(e) => (e.currentTarget.src = "/images/card1.jpg")}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-orange-900/10 to-blue-900/10"></div>
            </div>

            <div className="absolute -top-8 -right-8 w-28 h-28 bg-linear-to-br from-orange-400 to-red-500 rounded-full opacity-10 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-linear-to-tr from-blue-400 to-indigo-500 rounded-full opacity-10 blur-2xl"></div>
          </div>

          {/* RIGHT SIDE TEXT CONTENT */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "badge")}
                className={`text-sm font-medium text-blue-600 ${
                  editMode ? "editable-border" : ""
                }`}
              >
                {content.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-bold leading-tight">
              About{" "}
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "title1")}
                className={`text-blue-500 ${editMode ? "editable-border" : ""}`}
              >
                {content.title1}
              </span>
              <br />
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "title2")}
                className={`text-blue-500 ${editMode ? "editable-border" : ""}`}
              >
                {content.title2}
              </span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "paragraph1")}
                className={editMode ? "editable-border" : ""}
              >
                {content.paragraph1}
              </p>

              <p
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "paragraph2")}
                className={editMode ? "editable-border" : ""}
              >
                {content.paragraph2}
              </p>

              <p
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditable(e, "paragraph3")}
                className={editMode ? "editable-border" : ""}
              >
                {content.paragraph3}
              </p>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-6 pt-6">
              {content.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "", i, "value")}
                    className={`text-3xl sm:text-4xl font-bold text-blue-500 ${
                      editMode ? "editable-border" : ""
                    }`}
                  >
                    {stat.value}
                  </div>

                  <div
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "", i, "label")}
                    className={`text-sm text-gray-600 font-medium ${
                      editMode ? "editable-border" : ""
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
