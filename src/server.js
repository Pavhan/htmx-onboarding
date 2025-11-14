import express from 'express';
import nunjucks from 'nunjucks';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import tasksRouter from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Nunjucks
const viewsPath = join(__dirname, 'views');
nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  throwOnUndefined: false,
  trimBlocks: true,
  lstripBlocks: true,
  watch: true, // Enable watching for template changes
  noCache: true, // Disable caching in development
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

app.set('views', viewsPath);
app.set('view engine', 'njk');

// Routes
app.use('/', tasksRouter);
app.use('/tasks', tasksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
