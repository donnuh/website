//paint window- wraps the live JS Paint app in an iframe
import paintHTML from './paint.html.js';

const container = document.getElementById('windows-container');
if (container) {
    container.insertAdjacentHTML('beforeend', paintHTML);
}