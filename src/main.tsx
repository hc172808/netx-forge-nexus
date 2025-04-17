
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// For dark mode by default
document.documentElement.classList.add('dark');

// Make sure we have a valid DOM element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(<App />);
