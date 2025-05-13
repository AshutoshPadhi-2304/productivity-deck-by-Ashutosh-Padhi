import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className={`mb-2 w-full rounded-md border border-dashed border-gray-800 bg-gray-900 p-2 ${
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
      <hr />
    </div>
  );
};

export default DropArea;
