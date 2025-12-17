"use client"
import axios from "@/utils/axios";
import { useState, useEffect } from "react";

export default function EditModeToggle() {
  const [editMode, setEditMode] = useState("off");

  useEffect(() => {
    axios.get("/settings/edit-mode").then(res => {
      setEditMode(res.data.edit_mode);
    });
  }, []);

  const toggleEditMode = async () => {
    const newVal = editMode === "on" ? "off" : "on";

    await axios.post("/settings/edit-mode", { value: newVal });
    setEditMode(newVal);
  };

  return (
    <div>
      <button
        onClick={toggleEditMode}
        className={`px-4 py-2 text-white rounded 
          ${editMode === "on" ? "bg-green-600" : "bg-gray-600"}`}
      >
        {editMode === "on" ? "Disable Edit Mode" : "Enable Edit Mode"}
      </button>
    </div>
  );
}
