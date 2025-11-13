// In-memory task storage service
let tasks = [
  {
    id: 1,
    title: 'Set up the development environment',
    completed: true,
  },
  {
    id: 2,
    title: 'Learn HTMX basics',
    completed: true,
  },
  {
    id: 3,
    title: 'Build task management app',
    completed: false,
  },
  {
    id: 4,
    title: 'Add form validation',
    completed: false,
  },
  {
    id: 5,
    title: 'Style the UI with Tailwind CSS',
    completed: false,
  },
];
let nextId = 6;

/**
 * Get all tasks
 * @returns {Array} Array of all tasks
 */
export const getAllTasks = () => {
  return [...tasks];
};

/**
 * Get a task by ID
 * @param {number} id - Task ID
 * @returns {Object|null} Task object or null if not found
 */
export const getTaskById = (id) => {
  return tasks.find((task) => task.id === id) || null;
};

/**
 * Create a new task
 * @param {string} title - Task title
 * @returns {Object} Created task object
 */
export const createTask = (title) => {
  if (!title || title.trim() === '') {
    throw new Error('Task title cannot be empty');
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);
  return task;
};

/**
 * Toggle task completion status
 * @param {number} id - Task ID
 * @returns {Object|null} Updated task or null if not found
 */
export const toggleTask = (id) => {
  const task = getTaskById(id);
  if (!task) {
    return null;
  }

  task.completed = !task.completed;
  return task;
};

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
};

/**
 * Get task statistics
 * @returns {Object} Statistics object with done, notDone, and total counts
 */
export const getTaskStats = () => {
  const done = tasks.filter((task) => task.completed).length;
  const notDone = tasks.filter((task) => !task.completed).length;
  const total = tasks.length;

  return { done, notDone, total };
};
