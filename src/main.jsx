// Это самый первый файл, который запускается в приложении.
// Его задача — взять наш главный компонент <App /> и "вставить" его в HTML-страницу.

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// В index.html есть пустой <div id="root">. Сюда React и нарисует всё приложение.
createRoot(document.getElementById('root')).render(<App />);
