//menu dropdowns
export function toggleMenu(event) {
    event.stopPropagation();
    const menuItem = event.currentTarget;
    const wasOpen = menuItem.classList.contains('open');
    document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
    if (!wasOpen) menuItem.classList.add('open');
}

export function toggleAccordion(header) {
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

//close menus when clicking elsewhere
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
    }
});

window.toggleMenu = toggleMenu;
window.toggleAccordion = toggleAccordion;
