/**
Exercise: Implement an Advanced Task Manager

Create a function called `createTaskManager` that returns an object with methods to manage a list of tasks. The task manager should have the following features:

1. Add tasks with a description and priority (high, medium, low).
2. Complete tasks.
3. Delete tasks.
4. List all tasks.
5. Filter tasks by status (completed/uncompleted) or priority.
6. Sort tasks by priority or date added.
7. Generate a summary of tasks (total count, completed count, count by priority).

Each task should have: id (unique), description, priority, completed status, and dateAdded.
 */

const createTaskManager = () => {
  const tasks = new Map();
  let nextId = 1;
  return {
    addTask: (name) => (priority) => {
      const id = nextId++;
      tasks.set(id, {
        id,
        name,
        priority,
        status: "uncompleted",
        dateAdded: new Date(),
      });
      return id;
    },
    completeTask: (id) => {
      if (!tasks.has(id)) throw Error("not found");
      tasks.set(id, {
        ...tasks.get(id),
        status: "completed",
      });
    },
    deleteTask: (id) => {
      if (!tasks.has(id)) throw Error("not found");
      tasks.delete(id);
    },
    filterTasks: (params) => {
      return [...tasks.values()].filter(
        (task) =>
          task.status === params || task.priority === params || params === "all"
      );
    },
    sortTasks: (params) => {
      const arrayTasks = [...tasks.values()];
      arrayTasks.sort((a, b) => a[params].localeCompare(b[params]));
      return arrayTasks;
    },
    getTaskSummary: () => {
      const vals = [...tasks.values()];
      const highPriority = [];
      const mediumPriority = [];
      const lowPriority = [];

      vals.forEach((i) => {
        switch (i.priority) {
          case "high":
            highPriority.push(i);
            break;
          case "medium":
            mediumPriority.push(i);
            break;
          case "low":
            lowPriority.push(i);
            break;
          default:
            break;
        }
      });
      return {
        size: vals.length,
        completed: vals.filter((i) => i.status === "completed"),
        high: highPriority.length,
        medium: mediumPriority.length,
        low: lowPriority.length,
      };
    },
    listTasks: () => {
      return [...tasks.values()];
    },
  };
};

const taskManager = createTaskManager();
taskManager.addTask("Buy groceries")("high");
taskManager.addTask("Read a book")("low");
taskManager.addTask("Check slip")("medium");
taskManager.addTask("low a book")("low");
// console.log(taskManager.listTasks())

taskManager.completeTask(2);
// console.log(taskManager.listTasks())
console.log(taskManager.filterTasks("high"));
console.log(taskManager.filterTasks("completed"));
console.log(taskManager.sortTasks("priority"));
console.log(taskManager.getTaskSummary());
