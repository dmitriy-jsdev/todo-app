import { createRoot } from 'react-dom/client';
import App from './сomponents/App/App';
import { TasksProvider } from './context/tasks/TasksProvider'; // путь под свой проект

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

const root = createRoot(container);
root.render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
