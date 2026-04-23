//manages taskbar buttons and clock
import { restoreWindow, minimizeWindow } from './window-manager.js';

//clock
function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clock.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

//taskbar buttons
export function addTaskbarButton(windowId) {
    const container = document.getElementById('taskbar-windows');
    if (!container) return;
    if (container.querySelector(`.taskbar-btn[data-target="${windowId}"]`)) return;

    const win = document.getElementById(windowId);
    const title = win.dataset.windowTitle || 'Window';
    const iconSrc = win.dataset.windowIcon || '';

    const btn = document.createElement('button');
    btn.className = 'taskbar-btn active';
    btn.dataset.target = windowId;
    btn.innerHTML = `
        ${iconSrc ? `<img src="${iconSrc}" alt="">` : ''}
        <span>${title}</span>
    `;
    btn.addEventListener('click', () => {
        const w = document.getElementById(windowId);
        if (w.style.display === 'none') {
            restoreWindow(windowId);
        } else {
            minimizeWindow(windowId);
        }
    });

    container.appendChild(btn);
}

export function removeTaskbarButton(windowId) {
    const btn = document.querySelector(`.taskbar-btn[data-target="${windowId}"]`);
    if (btn) btn.remove();
}

window.addTaskbarButton = addTaskbarButton;
window.removeTaskbarButton = removeTaskbarButton;
