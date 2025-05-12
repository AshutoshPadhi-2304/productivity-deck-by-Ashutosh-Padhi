import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useKanbanModeStore = create(
  persist(
    (set) => ({
      columns: {
        todo: { title: "To-do", tasks: [] },
        inProgress: { title: "In progress", tasks: [] },
        done: { title: "Done", tasks: [] },
      },

      addNewTask: (columnId, taskContent) => {
        set((state) => {
          const newTask = {
            id: Date.now().toString(),
            content: taskContent,
          };

          return {
            columns: {
              ...state.columns,
              [columnId]: {
                ...state.columns[columnId],
                tasks: [...state.columns[columnId].tasks, newTask],
              },
            },
          };
        });
      },

      deleteTask: (columnId, taskId) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              tasks: state.columns[columnId].tasks.filter(
                (task) => task.id !== taskId
              ),
            },
          },
        }));
      },

      dragTask: (sourceColumnId, destinationColumnId, draggedTask) => {
        set((state) => {
          if (sourceColumnId === destinationColumnId) return state;

          return {
            columns: {
              ...state.columns,
              [sourceColumnId]: {
                ...state.columns[sourceColumnId],
                tasks: state.columns[sourceColumnId].tasks.filter(
                  (task) => task.id !== draggedTask.id
                ),
              },
              [destinationColumnId]: {
                ...state.columns[destinationColumnId],
                tasks: [
                  ...state.columns[destinationColumnId].tasks,
                  draggedTask,
                ],
              },
            },
          };
        });
      },
    }),
    {
      name: "kanban-mode-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useKanbanModeStore;
