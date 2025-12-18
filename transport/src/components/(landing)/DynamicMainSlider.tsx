"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FiStar, FiUsers } from "react-icons/fi";
import { websiteContentService } from "@/services/websiteContentService";
import { HeroContent, SlideContent } from "@/common/interface";
import { useLoader } from "@/context/LoaderContext";

export default function DynamicMainSlider() {
  const [content, setContent] = useState<HeroContent>({
    slides: [],
    rating: "",
    customerCount: "",
    ctaPrimaryText: "",
    ctaSecondaryText: "",
  });

  const [editMode, setEditMode] = useState(false); 
  const { showLoader, hideLoader } = useLoader();
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

 
  const saveContent = (key: string, value: string) => {
    if (!editMode) return; 

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      websiteContentService.update({
        key,
        value,
        section: "hero_slider",
        type: "text",
      });
    }, 500);
  };

 
  useEffect(() => {
    async function loadEditMode() {
      const res = await websiteContentService.getEditMode();
      setEditMode(res.data?.edit_mode === "on");
    }
    loadEditMode();
  }, []);


  
  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      const response = await websiteContentService.getContentBySection("hero_slider");
      const d = response.data?.data;

      console.log("Fetched hero slider content:", d);

      const slides: SlideContent[] = [];
      let i = 1;

      while (d[`hero_slide_${i}_title`]) {
        slides.push({
          title: d[`hero_slide_${i}_title`]?.value || "",
          subtitle: d[`hero_slide_${i}_subtitle`]?.value || "",
          image: d[`hero_slide_${i}_image`]?.value || `/images/${i}.jpg`,
        });
        i++;
      }

      setContent({
        slides,
        rating: d.rating?.value || "4.8",
        customerCount: d.customer_count?.value || "5,000+ customers",
        ctaPrimaryText: d.cta_primary_text?.value || "Get Started",
        ctaSecondaryText: d.cta_secondary_text?.value || "Book a Demo",
      });

      hideLoader();
    };

    fetchData();
  }, []);


  const handleEditableChange = (e: any, key: string) => {
    if (!editMode) return; 

    const newValue = e.currentTarget.innerText;

    setContent((prev) => {
      const updated = { ...prev };

      const match = key.match(/hero_slide_(\d+)_(title|subtitle)/);

      if (match) {
        const slideIndex = Number(match[1]) - 1;
        const field = match[2];

        updated.slides[slideIndex] = {
          ...updated.slides[slideIndex],
          [field]: newValue,
        };
      } else {
        (updated as any)[key] = newValue;
      }

      return updated;
    });

    saveContent(key, newValue);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden pt-16 bg-gray-50">

      <div className="container mx-auto h-full px-4 md:px-8">
        <div className="grid md:grid-cols-2 h-full items-center gap-10">

          <div>
            <Swiper modules={[Autoplay]} loop autoplay={{ delay: 4500 }}>
              {content.slides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <h1
                    contentEditable={editMode} 
                    suppressContentEditableWarning
                    onInput={(e) => handleEditableChange(e, `hero_slide_${i + 1}_title`)}
                    className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${
                      editMode ? "editable-border" : ""
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <p
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditableChange(e, `hero_slide_${i + 1}_subtitle`)}
                    className={`text-lg md:text-xl text-gray-600 ${
                      editMode ? "editable-border" : ""
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center gap-4 mt-6">
              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditableChange(e, "rating")}
                className="text-2xl font-bold"
              >
                {content.rating}
              </span>
              <FiStar className="text-yellow-500 w-6 h-6" />

              <span
                contentEditable={editMode}
                suppressContentEditableWarning
                onInput={(e) => handleEditableChange(e, "customer_count")}
                className="text-gray-700"
              >
                {content.customerCount}
              </span>
              <FiUsers className="w-5 h-5 text-gray-600" />
            </div>

            <div className="flex gap-3 mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow">
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditableChange(e, "cta_primary_text")}
                >
                  {content.ctaPrimaryText}
                </span>
              </button>

              <button className="px-6 py-3 border border-gray-300 rounded-lg">
                <span
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onInput={(e) => handleEditableChange(e, "cta_secondary_text")}
                >
                  {content.ctaSecondaryText}
                </span>
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[450px]">
              <Swiper modules={[Autoplay, EffectFade]} loop effect="fade" autoplay={{ delay: 4500 }}>
                {content.slides.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <img src={slide.image} className="w-full h-full object-cover" alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
