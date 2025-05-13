import React, { useState } from "react";

import { KANBAN_COLUMN_IDS } from "components/constants";
import Column from "components/Kanban/Column";
import useKanbanModeStore from "stores/useKanbanModeStore";

const Kanban = () => {
  const [dragTask, setDragTask] = useState(null);
  const [activeInputColumn, setActiveInputColumn] = useState(null);
  const columns = useKanbanModeStore((store) => store.columns);
  const dragTaskHandler = useKanbanModeStore((store) => store.dragTask);

  const handleTaskDrop = (columnId) => {
    dragTaskHandler(activeInputColumn, columnId, dragTask);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-12 ml-12 mt-6 self-start text-4xl font-bold">
        Kanban mode
      </h1>
      <div className="flex h-96 w-full flex-row justify-between gap-12 px-12">
        {KANBAN_COLUMN_IDS.map((columnId) => (
          <Column
            activeInputColumn={activeInputColumn}
            columnId={columnId}
            key={columnId}
            label={columns[columnId].title}
            setActiveInputColumn={setActiveInputColumn}
            setDragTask={setDragTask}
            tasks={columns[columnId].tasks}
            onDrop={handleTaskDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default Kanban;
