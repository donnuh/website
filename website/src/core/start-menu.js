//start menu
import startMenuHTML from './start-menu.html.js';

//inject markup into body
document.body.insertAdjacentHTML('beforeend', startMenuHTML);

const startMenu = document.getElementById('start-menu');
const startButton = document.querySelector('.start-button');

//toggle open/close
export function toggleStartMenu(event) {
    if (event) event.stopPropagation();
    if (!startMenu) return;
    startMenu.classList.toggle('open');
    if (startButton) startButton.classList.toggle('active', startMenu.classList.contains('open'));
}

export function closeStartMenu() {
    if (!startMenu) return;
    startMenu.classList.remove('open');
    if (startButton) startButton.classList.remove('active');
}

//start button click handler
if (startButton) {
    startButton.addEventListener('click', toggleStartMenu);
}

//close when clicking outside
document.addEventListener('click', (e) => {
    if (!startMenu || !startMenu.classList.contains('open')) return;
    if (e.target.closest('#start-menu')) return;
    if (e.target.closest('.start-button')) return;
    closeStartMenu();
});

//close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeStartMenu();
});

//start menu actions
export function startOpenWindow(windowId) {
    closeStartMenu();
    if (typeof window.openWindow === 'function') {
        window.openWindow(windowId);
    }
}

export function startOpenLink(url) {
    closeStartMenu();
    window.open(url, '_blank', 'noopener');
}

//log off /shut down
export function startShutdown() {
    closeStartMenu();
    document.body.style.transition = 'opacity 0.6s ease-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = '/';
    }, 600);
}

window.toggleStartMenu = toggleStartMenu;
window.closeStartMenu = closeStartMenu;
window.startOpenWindow = startOpenWindow;
window.startOpenLink = startOpenLink;
window.startShutdown = startShutdown;