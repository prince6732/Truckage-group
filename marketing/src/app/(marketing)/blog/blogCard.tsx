"use client";

import { FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BlogCard({ item }: any) {
  return (
    
    <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

      <img
        src={item.img}
        alt={item.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3 space-x-4">
          <div className="flex items-center space-x-1">
            <FaUser className="w-4 h-4 dark:text-gray-200" />
            <span className="dark:text-gray-200">{item.author}</span>
          </div>
          <div className="flex items-center space-x-1 dark:text-gray-200">
            <FaCalendarAlt className="w-4 h-4 dark:text-gray-200" />
            <span>{item.date}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {item.description}
        </p>

        <button className="mt-4 text-primary font-semibold hover:underline">
          Read More →
        </button>
      </div>
    </div>
  );
}
