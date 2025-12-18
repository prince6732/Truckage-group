// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { FiStar, FiUsers } from "react-icons/fi";
// import { websiteContentService } from "@/services/websiteContentService";
// import { useLoader } from "@/context/LoaderContext";
// import truck1 from "../../public/images/premium_photo-1733342421852-3bce709563e4.avif";
// import truck2 from "../../public/images/truck-highway-sunny-sky.jpg";
// import truck3 from "../../public/images/truck4.jpg";

// export default function MainSlider() {
//   const [content, setContent] = useState({
//     slides: [],
//     rating: "",
//     customerCount: "",
//     ctaPrimaryText: "",
//     ctaSecondaryText: "",
//   });

//   const [editMode, setEditMode] = useState(false);
//   const { showLoader, hideLoader } = useLoader();
//   const saveTimeout = useRef<any>(null);

//   // -----------------------------
//   // AUTO SAVE (NO UI INTERRUPTION)
//   // -----------------------------
//   const saveContent = (key: string, value: string) => {
//     if (!editMode) return;

//     if (saveTimeout.current) clearTimeout(saveTimeout.current);

//     saveTimeout.current = setTimeout(() => {
//       websiteContentService.update({
//         key,
//         value,
//         section: "hero_slider",
//         type: "text",
//       });
//     }, 500);
//   };

//   // -----------------------------
//   // LOAD EDIT MODE
//   // -----------------------------
//   useEffect(() => {
//     websiteContentService.getEditMode().then((res) => {
//       setEditMode(res.data?.edit_mode === "on");
//     });
//   }, []);

//   // -----------------------------
//   // LOAD DYNAMIC CONTENT
//   // -----------------------------
//   useEffect(() => {
//     async function loadContent() {
//       showLoader();
//       const res = await websiteContentService.getContentBySection("hero_slider");
//       const d = res.data?.data;

//       let slides: any = [];
//       let i = 1;

//       const defaultTruckImages = [truck1, truck2, truck3];

//       while (d[`hero_slide_${i}_title`]) {
//         slides.push({
//           title: d[`hero_slide_${i}_title`]?.value || "",
//           subtitle: d[`hero_slide_${i}_subtitle`]?.value || "",
//           image: d[`hero_slide_${i}_image`]?.value || defaultTruckImages[i - 1] || truck1,
//         });
//         i++;
//       }

//       // If no slides found in database, use default truck images
//       if (slides.length === 0) {
//         slides = [
//           {
//             title: "Professional Transport Services",
//             subtitle: "Reliable logistics solutions for your business needs",
//             image: truck1
//           },
//           {
//             title: "Advanced Fleet Management",
//             subtitle: "Modern trucks equipped with latest technology",
//             image: truck2
//           },
//           {
//             title: "Nationwide Coverage",
//             subtitle: "Delivering across India with trust and efficiency",
//             image: truck3
//           }
//         ];
//       }

//       setContent({
//         slides,
//         rating: d.rating?.value || "4.8",
//         customerCount: d.customer_count?.value || "5,000+ customers",
//         ctaPrimaryText: d.cta_primary_text?.value || "Get Started",
//         ctaSecondaryText: d.cta_secondary_text?.value || "Book a Demo",
//       });

//       hideLoader();
//     }

//     loadContent();
//   }, []);

//   // -----------------------------------------
//   // PERFECT EDITABLE HANDLER (NO CURSOR JUMP)
//   // -----------------------------------------
//   const handleEditable = (e: any, key: string) => {
//     if (!editMode) return;

//     const newValue = e.target.innerText;

//     if (saveTimeout.current) clearTimeout(saveTimeout.current);

//     saveTimeout.current = setTimeout(() => {
//       saveContent(key, newValue);
//     }, 400);
//   };

//   return (
//     <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden pt-16 bg-gray-50">

//       <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 h-full items-center gap-8">

//           {/* LEFT SIDE */}
//           <div className="space-y-6">

//             {/* TEXT SLIDER */}
//             <Swiper modules={[Autoplay]} loop autoplay={{ delay: 5000 }}>
//               {content.slides.map((slide: any, i: number) => (
//                 <SwiperSlide key={i}>

//                   <h1
//                     contentEditable={editMode}
//                     suppressContentEditableWarning
//                     onInput={(e) => handleEditable(e, `hero_slide_${i + 1}_title`)}
//                     className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${
//                       editMode ? "editable-border" : ""
//                     }`}
//                   >
//                     {slide.title}
//                   </h1>

//                   <p
//                     contentEditable={editMode}
//                     suppressContentEditableWarning
//                     onInput={(e) => handleEditable(e, `hero_slide_${i + 1}_subtitle`)}
//                     className={`text-lg md:text-xl text-gray-600 ${
//                       editMode ? "editable-border" : ""
//                     }`}
//                   >
//                     {slide.subtitle}
//                   </p>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* RATING */}
//             <div className="flex items-center gap-4">
//               <span
//                 contentEditable={editMode}
//                 suppressContentEditableWarning
//                 onInput={(e) => handleEditable(e, "rating")}
//                 className="text-2xl font-bold"
//               >
//                 {content.rating}
//               </span>
//               <FiStar className="text-yellow-500" />

//               <span
//                 contentEditable={editMode}
//                 suppressContentEditableWarning
//                 onInput={(e) => handleEditable(e, "customer_count")}
//                 className="text-gray-700"
//               >
//                 {content.customerCount}
//               </span>
//               <FiUsers className="text-gray-600" />
//             </div>

//             <div className="flex gap-4 mt-6">

//               <button className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow">
//                 <span
//                   contentEditable={editMode}
//                   suppressContentEditableWarning
//                   onInput={(e) => handleEditable(e, "cta_primary_text")}
//                 >
//                   {content.ctaPrimaryText}
//                 </span>
//               </button>

//               <button className="px-8 py-4 border border-gray-300 rounded-xl">
//                 <span
//                   contentEditable={editMode}
//                   suppressContentEditableWarning
//                   onInput={(e) => handleEditable(e, "cta_secondary_text")}
//                 >
//                   {content.ctaSecondaryText}
//                 </span>
//               </button>

//             </div>
//           </div>

//           {/* RIGHT IMAGE SLIDER */}
//           <div className="relative rounded-3xl overflow-hidden shadow-xl h-[450px]">
//             <Swiper modules={[Autoplay, EffectFade]} loop effect="fade" autoplay={{ delay: 5000 }}>
//               {[truck1, truck2, truck3].map((truckImage, i: number) => (
//                 <SwiperSlide key={i}>
//                   <img src={truckImage} alt={`Transport Truck ${i + 1}`} className="w-full h-full object-cover" />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FiStar, FiUsers } from "react-icons/fi";
import { websiteContentService } from "@/services/websiteContentService";
import { useLoader } from "@/context/LoaderContext";
import truck1 from "../../public/images/premium_photo-1733342421852-3bce709563e4.avif";
import truck2 from "../../public/images/truck-highway-sunny-sky.jpg";
import truck3 from "../../public/images/truck4.jpg";

type Slide = {
  title: string;
  subtitle: string;
  image: any; // can be string (URL) or imported image object
};

export default function MainSlider() {
  const [content, setContent] = useState<{
    slides: Slide[];
    rating: string;
    customerCount: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
  }>({
    slides: [],
    rating: "",
    customerCount: "",
    ctaPrimaryText: "",
    ctaSecondaryText: "",
  });

  const [editMode, setEditMode] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const saveTimeout = useRef<any>(null);

  // -----------------------------
  // AUTO SAVE (NO UI INTERRUPTION)
  // -----------------------------
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

  // -----------------------------
  // LOAD EDIT MODE
  // -----------------------------
  useEffect(() => {
    websiteContentService.getEditMode().then((res) => {
      setEditMode(res.data?.edit_mode === "on");
    });
  }, []);

  // -----------------------------
  // LOAD DYNAMIC CONTENT
  // -----------------------------
  useEffect(() => {
    async function loadContent() {
      showLoader();
      const res = await websiteContentService.getContentBySection("hero_slider");
      const d = res.data?.data || {};

      const defaultTruckImages = [truck1, truck2, truck3];

      const slides: Slide[] = [];
      let i = 1;

      while (d[`hero_slide_${i}_title`]) {
        slides.push({
          title: d[`hero_slide_${i}_title`]?.value || "",
          subtitle: d[`hero_slide_${i}_subtitle`]?.value || "",
          image:
            d[`hero_slide_${i}_image`]?.value ||
            defaultTruckImages[i - 1] ||
            truck1,
        });
        i++;
      }

      // If no slides found in database, use default truck images
      const finalSlides =
        slides.length > 0
          ? slides
          : [
            {
              title: "Smart Logistics",
              subtitle: "Efficient transport solutions for modern business",
              image: truck1,
            },
            {
              title: "Fleet Excellence",
              subtitle: "Advanced technology, reliable delivery",
              image: truck2,
            },
            {
              title: "Global Reach",
              subtitle: "Connecting destinations with precision",
              image: truck3,
            },
          ];

      setContent({
        slides: finalSlides,
        rating: d.rating?.value || "4.9",
        customerCount: d.customer_count?.value || "2,500+ Clients",
        ctaPrimaryText: d.cta_primary_text?.value || "Get Started",
        ctaSecondaryText: d.cta_secondary_text?.value || "Learn More",
      });

      hideLoader();
    }

    loadContent();
  }, []);

  // -----------------------------------------
  // PERFECT EDITABLE HANDLER (NO CURSOR JUMP)
  // -----------------------------------------
  const handleEditable = (e: any, key: string) => {
    if (!editMode) return;
    const newValue = e.target.innerText;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      saveContent(key, newValue);
    }, 400);
  };

  // Helper to get proper src from string or imported image
  const getImageSrc = (img: any) => {
    if (!img) return "";
    // If it's an imported image object, use .src
    if (typeof img === "object" && "src" in img) return img.src;
    // If it's already a string URL from DB
    if (typeof img === "string") return img;
    return "";
  };

  return (
    <>

      <div className="h-0 sm:h-20">
      </div>

      <div className="relative w-full min-h-[70vh]  overflow-hidden">





        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center h-full">


            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/30 h-[45vh] sm:h-[55vh] lg:h-[65vh]">

                <Swiper modules={[Autoplay, EffectFade]} loop effect="fade" autoplay={{ delay: 5000 }} className="h-full w-full">
                  {[truck1, truck2, truck3].map((image: any, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={image.src || image}
                        alt={`Truck ${i + 1}`}
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="absolute inset-0 bg-linear-to-tr from-blue-900/10 via-transparent to-indigo-900/10 pointer-events-none" />

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/50 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-500/50 rounded-full blur-3xl" />

              </div>

              <div className="absolute -bottom-5 -left-5 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Service</div>
                </div>
              </div>
            </div>

            <div className="space-y-12 order-2 lg:order-1">

              {/* Dynamic Hero Text Slider */}
              <div className="min-h-80 flex items-center">
                <div className="w-full">
                  <Swiper modules={[Autoplay]} loop autoplay={{ delay: 5000 }} className="h-full">
                    {content.slides.map((slide, i) => (
                      <SwiperSlide key={i} className="flex flex-col justify-center">
                        <h1
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onInput={(e) => handleEditable(e, `hero_slide_${i + 1}_title`)}
                          className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-black leading-[0.95] mb-6 tracking-tight ${editMode ? "editable-border" : ""
                            }`}
                        >
                          {slide.title || "Smart Logistics"}
                        </h1>

                        <p
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onInput={(e) => handleEditable(e, `hero_slide_${i + 1}_subtitle`)}
                          className={`font-body text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed ${editMode ? "editable-border" : ""
                            }`}
                        >
                          {slide.subtitle || "Efficient transport solutions for modern business"}
                        </p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {/* Enhanced Rating & Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "rating")}
                    className={`text-2xl font-light text-black ${editMode ? "editable-border" : ""
                      }`}
                  >
                    {content.rating || "4.9"}
                  </span>
                  <FiStar className="text-black text-xl" />
                </div>

                <div className="h-6 w-px bg-gray-300"></div>

                <div className="flex items-center gap-2">
                  <FiUsers className="text-black text-xl" />
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "customer_count")}
                    className={`text-black font-light text-base ${editMode ? "editable-border" : ""
                      }`}
                  >
                    {content.customerCount || "2,500+ Clients"}
                  </span>
                </div>
              </div>

              {/* Simple CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded font-light text-base hover:bg-blue-700 transition-colors">
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "cta_primary_text")}
                    className={editMode ? "editable-border" : ""}
                  >
                    {content.ctaPrimaryText || "Get Started"}
                  </span>
                </button>

                <button className="px-6 py-3 bg-white border border-gray-300 text-black rounded font-light text-base hover:border-blue-600 hover:text-blue-600 transition-colors">
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onInput={(e) => handleEditable(e, "cta_secondary_text")}
                    className={editMode ? "editable-border" : ""}
                  >
                    {content.ctaSecondaryText || "Learn More"}
                  </span>
                </button>
              </div>
            </div>



          </div>
        </div>
      </div>
    </>

  );
}
