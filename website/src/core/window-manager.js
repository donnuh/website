//window manager: open/close/minimise/maximise/drag

let topZIndex = 500;
const openWindows = new Set();

export function openWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    if (openWindows.has(windowId)) {
        restoreWindow(windowId);
        return;
    }

    win.style.display = 'flex';
    win.classList.add('opening');
    bringToFront(win);
    setTimeout(() => win.classList.remove('opening'), 400);

    openWindows.add(windowId);

    if (typeof window.addTaskbarButton === 'function') {
        window.addTaskbarButton(windowId);
    }

    triggerAddressProgress(win);

    //fire a custom event so per window modules can react
    win.dispatchEvent(new CustomEvent('window:opened', { bubbles: true }));
}

export function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    win.style.display = 'none';
    win.classList.remove('maximized');
    openWindows.delete(windowId);

    if (typeof window.removeTaskbarButton === 'function') {
        window.removeTaskbarButton(windowId);
    }

    win.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
}

export function bringToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
    document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.taskbar-btn[data-target="${win.id}"]`);
    if (btn) btn.classList.add('active');
}

export function toggleMaximize(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.classList.toggle('maximized');
    bringToFront(win);
    closeAllMenus();
}

export function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'none';
    closeAllMenus();
    const btn = document.querySelector(`.taskbar-btn[data-target="${windowId}"]`);
    if (btn) btn.classList.remove('active');
}

export function restoreWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'flex';
    bringToFront(win);
}

function triggerAddressProgress(win) {
    const progress = win.querySelector('.address-progress');
    if (!progress) return;
    progress.classList.remove('loading');
    void progress.offsetWidth;
    progress.classList.add('loading');
}

function closeAllMenus() {
    document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
}

//drag
function makeWindowDraggable(win) {
    const header = win.querySelector('.window-header');
    if (!header) return;

    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.win-btn')) return;
        if (win.classList.contains('maximized')) return;

        isDragging = true;
        const rect = win.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        bringToFront(win);
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        const minTop = 0;
        const maxTop = window.innerHeight - 40;
        const minLeft = -(win.offsetWidth - 100);
        const maxLeft = window.innerWidth - 100;
        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
        }
    });

    header.addEventListener('dblclick', (e) => {
        if (e.target.closest('.win-btn')) return;
        toggleMaximize(win.id);
    });
}

function attachFocusHandler(win) {
    win.addEventListener('mousedown', () => bringToFront(win));
}

export function initAllWindows() {
    document.querySelectorAll('.window').forEach(win => {
        makeWindowDraggable(win);
        attachFocusHandler(win);
    });
}

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.toggleMaximize = toggleMaximize;
window.minimizeWindow = minimizeWindow;
window.restoreWindow = restoreWindow;
