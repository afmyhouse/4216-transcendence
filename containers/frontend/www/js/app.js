import { handleLocation } from './routes.js';

// Listen for 'popstate' event to handle back and forward button
window.onpopstate = handleLocation;

// Call handleLocation on initial load (important for page refresh)
document.addEventListener('DOMContentLoaded', () => {
  handleLocation();  // This will handle the initial route after refresh
});

