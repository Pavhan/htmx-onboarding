import * as taskService from '../services/taskServices.js';
import { renderView } from '../utils/renderUtils.js';

/**
 * Render the main page with all tasks
 */
export const getIndex = (req, res) => {
  const tasks = taskService.getAllTasks();
  const stats = taskService.getTaskStats();

  res.render('index', {
    tasks,
    stats,
  });
};

/**
 * Create a new task (HTMX endpoint)
 * Returns partial HTML for the new task list and updated stats
 */
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).send('<div class="text-red-500">Task title cannot be empty</div>');
    }

    taskService.createTask(title);
    const tasks = taskService.getAllTasks();
    const stats = taskService.getTaskStats();

    // Render partials and combine with out-of-band swaps
    const taskListHtml = await renderView(res, 'partials/task-list', { tasks });
    let statsHtml = await renderView(res, 'partials/stats', { stats });

    // Inject hx-swap-oob attributes
    statsHtml = statsHtml.replace(/<div id="stats-card"/, '<div id="stats-card" hx-swap-oob="outerHTML"');

    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <div id="task-list" hx-swap-oob="outerHTML">
        ${taskListHtml}
      </div>
      ${statsHtml}
    `);
  } catch (error) {
    res.status(400).send(`<div class="text-red-500">${error.message}</div>`);
  }
};

/**
 * Toggle task completion status (HTMX endpoint)
 */
export const toggleTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = taskService.toggleTask(taskId);

  if (!task) {
    return res.status(404).send('<div class="text-red-500">Task not found</div>');
  }

  const stats = taskService.getTaskStats();

  // Render updated task row and stats
  const taskRowHtml = await renderView(res, 'partials/task-row', { task });
  let statsHtml = await renderView(res, 'partials/stats', { stats });

  // Inject hx-swap-oob attribute for stats only
  statsHtml = statsHtml.replace(/<div id="stats-card"/, '<div id="stats-card" hx-swap-oob="outerHTML"');

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    ${taskRowHtml}
    ${statsHtml}
  `);
};

/**
 * Delete a task (HTMX endpoint)
 */
export const deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const deleted = taskService.deleteTask(taskId);

  if (!deleted) {
    return res.status(404).send('<div class="text-red-500">Task not found</div>');
  }

  const tasks = taskService.getAllTasks();
  const stats = taskService.getTaskStats();

  // Render updated task list and stats
  const taskListHtml = await renderView(res, 'partials/task-list', { tasks });
  let statsHtml = await renderView(res, 'partials/stats', { stats });

  // Inject hx-swap-oob attribute for stats only
  statsHtml = statsHtml.replace(/<div id="stats-card"/, '<div id="stats-card" hx-swap-oob="outerHTML"');

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <div id="task-list">
      ${taskListHtml}
    </div>
    ${statsHtml}
  `);
};

/**
 * Get task list for modal (HTMX endpoint)
 */
export const getTasksForModal = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.render('partials/modal-content', { tasks });
};
