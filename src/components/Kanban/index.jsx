import { KANBAN_COLUMN_IDS } from "constants/kanban";

import React, { useState } from "react";

import Column from "components/Kanban/Column";
import i18n from "i18next";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useKanbanModeStore from "stores/useKanbanModeStore";
import withTitle from "utils/withTitle";

const Kanban = () => {
  const [dragTask, setDragTask] = useState(null);
  const [activeInputColumn, setActiveInputColumn] = useState(null);

  const columns = useKanbanModeStore((store) => store.columns);
  const dragTaskHandler = useKanbanModeStore((store) => store.dragTask);

  const { t } = useTranslation();

  const handleTaskDrop = (columnId) => {
    dragTaskHandler(activeInputColumn, columnId, dragTask);
    setActiveInputColumn(null);
    setDragTask(null);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Typography
        className="mb-28 ml-12 mt-6 self-start text-4xl"
        style="h1"
        weight="bold"
      >
        {t("label.modes.kanban")}
      </Typography>
      <div
        className="flex w-full flex-row justify-between gap-12 px-12"
        style={{ minHeight: "16rem" }}
      >
        {KANBAN_COLUMN_IDS.map((columnId) => (
          <Column
            {...{
              activeInputColumn,
              columnId,
              setActiveInputColumn,
              setDragTask,
              dragTask,
            }}
            key={columnId}
            label={columnId}
            tasks={columns[columnId].tasks}
            onDrop={handleTaskDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default withTitle(Kanban, i18n.t("title.kanban"));
