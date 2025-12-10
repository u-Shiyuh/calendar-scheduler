import React from "react";

export default function CameraCapture({ onCapture }) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onCapture(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
      />
    </div>
  );
}