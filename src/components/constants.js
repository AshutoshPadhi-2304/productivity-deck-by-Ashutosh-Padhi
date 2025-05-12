const TIMER_MODES = [
  { id: 1, name: "Pomodoro", duration: 25 * 60 },
  { id: 2, name: "Short Break", duration: 5 * 60 },
  { id: 3, name: "Long Break", duration: 15 * 60 },
];
const KANBAN_COLUMN_IDS = ["todo", "inProgress", "done"];

export { TIMER_MODES, KANBAN_COLUMN_IDS };
