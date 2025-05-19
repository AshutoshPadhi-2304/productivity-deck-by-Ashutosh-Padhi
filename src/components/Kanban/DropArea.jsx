import React from "react";

const DropArea = ({ onDrop, children }) => (
  <div
    className="} mb-2 h-full w-full rounded-md bg-transparent"
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => {
      onDrop();
    }}
  >
    {children}
  </div>
);

export default DropArea;
