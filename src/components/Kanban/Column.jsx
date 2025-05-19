import React, { useState } from "react";

import { ModalComponent } from "components/commons";
import { Delete, Plus } from "neetoicons";
import { Input, Button, Typography } from "neetoui";
import { isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";
import useKanbanModeStore from "stores/useKanbanModeStore";

import DropArea from "./DropArea";

const Column = ({
  label,
  columnId,
  tasks,
  activeInputColumn,
  setActiveInputColumn,
  onDrop,
  setDragTask,
  dragTask,
}) => {
  const { addNewTask, deleteTask } = useKanbanModeStore();

  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const { t } = useTranslation();

  const handleAddNewTask = () => {
    if (newTask.trim() === "") return;
    addNewTask(columnId, newTask);
    setNewTask("");
    setActiveInputColumn(null);
  };

  const handleRemoveTask = (taskId) => {
    deleteTask(columnId, taskId);
  };

  const handleAddNewTaskButtonClick = () => {
    setNewTask("");
    setActiveInputColumn((prev) =>
      prev === columnId ? handleAddNewTask() : columnId
    );
  };
  console.log(dragTask);

  return (
    <div className="flex w-1/3 flex-col items-center justify-center rounded-lg border border-gray-900 p-4">
      <DropArea onDrop={() => onDrop(columnId)}>
        <Typography
          className="mb-4 ml-4 self-start text-xl"
          style="h2"
          weight="bold"
        >
          {t(`kanban.columns.${label}`)}
        </Typography>
        <div className="flex h-full w-full flex-col items-center">
          {isEmpty(tasks) ? (
            <Typography className="text-black" style="h3" weight="bold">
              {t("kanban.empty")}
            </Typography>
          ) : (
            tasks.map((task) => (
              <div
                draggable
                className="active:opacity-0.8 group mb-2 flex w-full items-center rounded-md border border-gray-800 p-1"
                key={task.id}
                onDragEnd={() => {
                  setActiveInputColumn(null);
                  setDragTask(null);
                }}
                onDragStart={() => {
                  setActiveInputColumn(columnId);
                  setDragTask(task);
                }}
              >
                <Typography
                  className="ml-2 text-black"
                  component={columnId === "done" ? "del" : "span"}
                >
                  {task.content}
                </Typography>
                <Button
                  className="ml-auto bg-transparent text-black opacity-0 hover:bg-gray-800 hover:text-white group-hover:opacity-100"
                  icon={Delete}
                  style="tertiary"
                  onClick={() => {
                    setShowModal(true);
                    setTaskId(task.id);
                  }}
                />
                <ModalComponent
                  confirmMessage={t("kanban.modal.delete")}
                  isOpen={showModal}
                  label={t("kanban.removeTask")}
                  closeModal={() => {
                    setShowModal(false);
                    setTaskId(null);
                  }}
                  confirmModal={() => {
                    handleRemoveTask(taskId);
                    setShowModal(false);
                  }}
                />
              </div>
            ))
          )}
          {activeInputColumn === columnId && isNil(dragTask) && (
            <div className="mb-2 flex w-full items-center rounded-md p-1">
              <Input
                autoFocus
                placeholder={t("kanban.enterTask")}
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleAddNewTask()
                }
              />
            </div>
          )}
        </div>
      </DropArea>
      <Button
        className="bg-transparent text-black hover:bg-gray-400"
        icon={Plus}
        iconPosition="right"
        label={t("kanban.addTask")}
        style="tertiary"
        onClick={handleAddNewTaskButtonClick}
      />
    </div>
  );
};

export default Column;
