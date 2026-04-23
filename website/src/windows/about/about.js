// ============================================
// ABOUT WINDOW
// ============================================
import aboutHTML from './about.html.js';

// Inject the window markup into the windows container
const container = document.getElementById('windows-container');
if (container) {
    container.insertAdjacentHTML('beforeend', aboutHTML);
}

// No extra behaviour needed yet — accordions and menus are wired up globally
// via data attributes and inline onclick handlers.
