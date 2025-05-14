import React, { useState } from "react";

import { ModalComponent } from "components/commons";
import { Delete } from "neetoicons";
import { Input, Button } from "neetoui";
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
}) => {
  const { addNewTask, deleteTask } = useKanbanModeStore();
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="flex w-1/3 flex-col items-center justify-center rounded-lg border border-gray-900 p-4">
      <DropArea onDrop={() => onDrop(columnId)}>
        <h2 className="mb-4 ml-4 self-start text-xl font-bold">{label}</h2>
        <div className="flex h-full w-full flex-col items-center">
          {tasks.map((task) => (
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
              <span
                className={`ml-2 text-black ${
                  columnId === "done" ? "line-through" : ""
                }`}
              >
                {task.content}
              </span>
              <Button
                className="ml-auto bg-transparent text-black opacity-0 hover:bg-gray-800 hover:text-white group-hover:opacity-100"
                icon={Delete}
                style="tertiary"
                onClick={() => setShowModal(true)}
              />
              <ModalComponent
                closeModal={() => setShowModal(false)}
                confirmMessage="Delete"
                isOpen={showModal}
                label="Remove task"
                confirmModal={() => {
                  handleRemoveTask(task.id);
                  setShowModal(false);
                }}
              />
            </div>
          ))}
          {activeInputColumn === columnId && (
            <div className="mb-2 flex w-full items-center rounded-md p-1">
              <Input
                autoFocus
                placeholder="Enter task"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNewTask()}
              />
            </div>
          )}
        </div>
      </DropArea>
      <Button
        className="bg-transparent text-black hover:bg-gray-400 "
        label="Add new task +"
        style="tertiary"
        onClick={handleAddNewTaskButtonClick}
      />
    </div>
  );
};

export default Column;
