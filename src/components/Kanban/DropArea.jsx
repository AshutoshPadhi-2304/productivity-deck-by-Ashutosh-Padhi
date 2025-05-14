import React, { useState } from "react";

const DropArea = ({ onDrop, children }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      className="} mb-2 h-full w-full rounded-md bg-transparent"
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
        console.log(showDrop);
      }}
    >
      {children}
    </div>
  );
};

export default DropArea;
