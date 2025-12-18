"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  // Configure the YouTube video ID you want to play in the modal.
  // Using the provided link: https://youtu.be/0rjEmtyZhzs?si=J14LlSnKlB0hAXag
  // Video ID: 0rjEmtyZhzs
  const youtubeId = "0rjEmtyZhzs";

  return (
//     <section className="relative isolate overflow-hidden py-10 sm:py-16 bg-linear-to-b from-gray-50 to-white">

//       {/* BACKGROUND ELEMENTS */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute inset-y-0 right-1/2 -z-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-gray-200/50 md:right-2/3"></div>
//         <div className="absolute left-0 top-0 -z-20 h-1/3 w-full rounded-b-full bg-linear-to-r from-primary-light/10 to-primary/10 blur-3xl"></div>
//         <div className="absolute right-0 bottom-0 -z-20 h-1/3 w-full rounded-t-full bg-linear-to-l from-primary-light/10 to-primary/10 blur-3xl"></div>
//       </div>

//       <div className="mx-auto max-w-7xl px-6 lg:px-8">

//         {/* SECTION HEADER */}
//         <div className="container mx-auto text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//             Logistics & Transport with Smart Technology 
//           </h2>

//           <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
//              Watch how our intelligent fleet tracking and transport management
//             system helps businesses save time, reduce costs, and operate with
//             unmatched efficiency across all routes.
//           </p>
//         </div>

//         {/* VIDEO THUMBNAIL */}
//         <div
//           className="video-thumbnail-container px-4 sm:px-0 animate-float"
//           style={{ animationDelay: "0.8s", animationFillMode: "both" }}
//         >
//           <button
//             onClick={() => setModalOpen(true)}
//             aria-label="Play video"
//             className="video-thumbnail-wrapper w-full h-full focus:outline-none"
//           >
//             <img
//               src="https://i.ytimg.com/vi/0rjEmtyZhzs/maxresdefault.jpg
// "
//               alt="Transport logistics video"
//               width={1920}
//               height={1080}
//               className="video-thumbnail bg-white object-cover rounded-2xl"
//             />

//             {/* Play Button */}
//             <div className="play-button">
//               <svg viewBox="0 0 24 24" fill="none">
//                 <path d="M8 5V19L19 12L8 5Z" fill="#4F46E5" />
//               </svg>
//             </div>
//           </button>
//         </div>

//         {/* MODAL BACKDROP */}
//         {modalOpen && (
//           <div
//             className="fixed inset-0 z-99999 bg-black/80 backdrop-blur-sm opacity-100 transition-opacity"
//             onClick={() => setModalOpen(false)}
//           ></div>
//         )}

//         {/* MODAL WINDOW */}
//         <div
//           className={`fixed inset-0 z-99999 flex px-4 md:px-6 py-6 transition-all ${
//             modalOpen
//               ? "opacity-100 scale-100 pointer-events-auto"
//               : "opacity-0 scale-90 pointer-events-none"
//           }`}
//         >
//           <div className="max-w-6xl mx-auto h-full flex items-center w-full">
//             <div
//               className="w-full max-h-full rounded-2xl shadow-2xl aspect-video bg-black overflow-hidden relative"
//               onClick={(e) => e.stopPropagation()}
//             >

//               {/* Close Button */}
//               <button
//                 onClick={() => setModalOpen(false)}
//                 aria-label="Close video"
//                 className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
//               >
//                 <X size={18} />
//               </button>

//               {/* VIDEO (YouTube iframe when youtubeId is set) */}
//               {youtubeId ? (
//                 <iframe
//                   title="Kela+ presentation"
//                   className="w-full h-full"
//                   src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               ) : (
//                 <video
//                   width="1920"
//                   height="1080"
//                   loop
//                   controls
//                   className="w-full h-full object-cover"
//                 >
//                   <source
//                     src="https://cruip-tutorials.vercel.app/modal-video/video.mp4"
//                     type="video/mp4"
//                   />
//                 </video>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>  
//       {/* CUSTOM ANIMATIONS */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes grow {
//           from { transform: scaleX(0); }
//           to { transform: scaleX(1); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
//         .animate-grow { animation: grow 0.6s ease-out forwards; transform-origin: center; }
//         .animate-float { animation: float 6s ease-in-out infinite; }

//         /* 3D Video Hover Styles */
//         .video-thumbnail-container { perspective: 1200px; max-width: 900px; margin: 0 auto; }
//         .video-thumbnail-wrapper {
//           position: relative;
//           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//           transform-style: preserve-3d;
//         }
//         .video-thumbnail {
//           border-radius: 1.5rem;
//           box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
//           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//           backface-visibility: hidden;
//         }
//         .video-thumbnail-container:hover .video-thumbnail-wrapper {
//           transform: rotateY(10deg) rotateX(3deg) scale(1.03);
//         }
//         .video-thumbnail-container:hover .video-thumbnail {
//           box-shadow: 0 32px 64px -12px rgba(0,0,0,0.2);
//         }
//         .play-button {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%, -50%);
//           width: 80px; height: 80px;
//           background: rgba(255,255,255,0.9);
//           border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           transition: all 0.3s ease;
//           box-shadow: 0 8px 32px rgba(0,0,0,0.2);
//         }
//         .video-thumbnail-container:hover .play-button {
//           transform: translate(-50%, -50%) scale(1.1);
//         }
//       `}</style>
//     </section>
<>
Hello
</>
  );
}
