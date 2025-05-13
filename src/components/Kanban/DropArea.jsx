import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className={`mb-2 rounded-md border border-dashed border-gray-400  p-2 ${
        showDrop ? "opacity-100" : "opacity-0"
      }`}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
    >
      Drop Here
    </div>
  );
};

export default DropArea;
