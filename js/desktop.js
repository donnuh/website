function openWindow(id) {
    const win = document.getElementById(id + '-window');
    if (win) {
        win.style.display = 'block';
    }
}
function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.style.display = 'none';
    }
}
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

document.querySelectorAll('.box-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.acc-arrow');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            arrow.textContent = '▼';
        } else {
            content.style.display = 'none';
            arrow.textContent = '▶';
        }
    });
});

//toggle file/view dropdown menus
function toggleMenu(event, menuId) {
    event.stopPropagation();
    const menuItem = event.currentTarget;
    const wasOpen = menuItem.classList.contains('open');
 
    //close any other open menus
    document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
 
    if (!wasOpen) {
        menuItem.classList.add('open');
    }
}
 
//to close menus when clicking anywhere else on the page
document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.menu-item.open').forEach(m => m.classList.remove('open'));
    }
});
function toggleAccordion(header) {
    const box = header.parentElement;
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.acc-arrow');
 
    if (content.style.display === 'none') {
        content.style.display = 'block';
        arrow.textContent = '▼';
        box.classList.add('active');
    } else {
        content.style.display = 'none';
        arrow.textContent = '▶';
        box.classList.remove('active');
    }
}