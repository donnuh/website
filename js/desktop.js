//track window z-index so clicked window comes to front
let topZIndex = 500;

//track which windows are open
const openWindows = new Set();

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

function openWindow(windowId) {
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
    addTaskbarButton(windowId);
    triggerAddressProgress(win);
}

function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    win.style.display = 'none';
    win.classList.remove('maximized');
    openWindows.delete(windowId);
    removeTaskbarButton(windowId);

    win.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
}

function bringToFront(win) {
    topZIndex++;
    win.style.zIndex = topZIndex;
    document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.taskbar-btn[data-target="${win.id}"]`);
    if (btn) btn.classList.add('active');
}

function toggleMaximize(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.classList.toggle('maximized');
    bringToFront(win);
    closeAllMenus();
}

function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'none';
    closeAllMenus();

    const btn = document.querySelector(`.taskbar-btn[data-target="${windowId}"]`);
    if (btn) btn.classList.remove('active');
}

function restoreWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'flex';
    bringToFront(win);
}

//taskbar buttons
function addTaskbarButton(windowId) {
    const container = document.getElementById('taskbar-windows');
    if (!container) return;

    //dont add duplicates
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

function removeTaskbarButton(windowId) {
    const btn = document.querySelector(`.taskbar-btn[data-target="${windowId}"]`);
    if (btn) btn.remove();
}

//address bar progress
function triggerAddressProgress(win) {
    const progress = win.querySelector('.address-progress');
    if (!progress) return;
    progress.classList.remove('loading');
    void progress.offsetWidth;
    progress.classList.add('loading');
}

//dropdown menus(file/view/help)
function toggleMenu(event) {
    event.stopPropagation();
    const menuItem = event.currentTarget;
    const wasOpen = menuItem.classList.contains('open');

    //close all other menus
    closeAllMenus();

    if (!wasOpen) {
        menuItem.classList.add('open');
    }
}

function closeAllMenus() {
    document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
}

//close menus when clicking elsewhere
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item')) {
        closeAllMenus();
    }
});

//sidebar accordions (social links / skills)
function toggleAccordion(header) {
    const box = header.parentElement;
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.acc-arrow');
    if (!content) return;

    const isHidden = content.style.display === 'none' || !content.style.display;

    if (isHidden) {
        content.style.display = 'block';
        if (arrow) arrow.textContent = '▼';
        box.classList.add('active');
    } else {
        content.style.display = 'none';
        if (arrow) arrow.textContent = '▶';
        box.classList.remove('active');
    }
}

//window dragging
function makeWindowDraggable(win) {
    const header = win.querySelector('.window-header');
    if (!header) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

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

document.querySelectorAll('.window').forEach(win => {
    makeWindowDraggable(win);
    attachFocusHandler(win);
});