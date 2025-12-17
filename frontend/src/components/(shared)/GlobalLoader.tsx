"use client";

import { useLoader } from "../../context/LoaderContext";

export default function GlobalLoader() {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-ribon-500"></div>
    </div>
  );
}
