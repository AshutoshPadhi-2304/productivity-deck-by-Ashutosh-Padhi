import React from "react";

const DropArea = ({ onDrop, children }) => (
  <div
    className="mb-2 h-full w-full rounded-md bg-transparent"
    onDragOver={(event) => event.preventDefault()}
    onDrop={(event) => {
      event.preventDefault();
      onDrop();
    }}
  >
    {children}
  </div>
);

export default DropArea;
