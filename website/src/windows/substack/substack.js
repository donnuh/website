//substack window - fetches RSS feed via rss2json, renders article list, back/forward history
import substackHTML from './substack.html.js';

const container = document.getElementById('windows-container');
if (container) {
    container.insertAdjacentHTML('beforeend', substackHTML);
}

const SUBSTACK_FEED_URL = 'https://d0nnaq.substack.com/feed';
const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json?rss_url=';

let substackArticles = [];
let substackLoaded = false;
let substackHistory = [];
let substackHistoryIndex = -1;

document.addEventListener('window:opened', (e) => {
    if (e.target.id === 'substack-window' && !substackLoaded) {
        substackFetchFeed();
    }
});

function substackFetchFeed() {
    const tree = document.getElementById('substack-tree');
    const status = document.getElementById('substack-status');

    if (tree) tree.innerHTML = '<div class="help-tree-loading">Loading articles from Substack...</div>';
    if (status) status.textContent = 'Connecting to Substack...';

    const url = RSS2JSON_ENDPOINT + encodeURIComponent(SUBSTACK_FEED_URL);

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(data => {
            if (data.status !== 'ok') throw new Error(data.message || 'Feed returned an error');

            substackArticles = (data.items || []).map(item => ({
                title: item.title || 'Untitled',
                link: item.link || '#',
                pubDate: item.pubDate || '',
                author: item.author || 'Donna',
                description: item.description || '',
                content: item.content || item.description || '',
                thumbnail: item.thumbnail || ''
            }));

            substackLoaded = true;
            substackRenderTree();

            if (status) {
                const count = substackArticles.length;
                status.textContent = count === 1 ? '1 article loaded' : `${count} articles loaded`;
            }
        })
        .catch(err => {
            console.error('Substack feed error:', err);
            if (tree) {
                tree.innerHTML = `
                    <div class="help-tree-error">
                        Could not load articles.<br><br>
                        <small>${escapeHtml(err.message)}</small><br><br>
                        <a href="https://d0nnaq.substack.com/" target="_blank" rel="noopener">
                            Open Substack in browser
                        </a>
                    </div>
                `;
            }
            if (status) status.textContent = 'Error loading feed';
        });
}

function substackRenderTree() {
    const tree = document.getElementById('substack-tree');
    if (!tree) return;

    if (substackArticles.length === 0) {
        tree.innerHTML = `
            <div class="help-tree-book">Donna's Substack</div>
            <div class="help-tree-loading" style="padding-left:22px;">No articles published yet.</div>
        `;
        return;
    }

    let html = `<div class="help-tree-book">Donna's Substack</div>`;
    substackArticles.forEach((article, i) => {
        const dateStr = formatArticleDate(article.pubDate);
        html += `
            <div class="help-tree-item" data-index="${i}" onclick="substackOpenArticle(${i})">
                <div>
                    <div class="help-tree-item-title">${escapeHtml(article.title)}</div>
                    <span class="help-tree-item-date">${dateStr}</span>
                </div>
            </div>
        `;
    });
    tree.innerHTML = html;
}

function substackOpenArticle(index, skipHistory = false) {
    const article = substackArticles[index];
    if (!article) return;

    const content = document.getElementById('substack-content');
    const status = document.getElementById('substack-status');
    if (!content) return;

    document.querySelectorAll('#substack-tree .help-tree-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.index) === index);
    });

    const dateStr = formatArticleDate(article.pubDate);
    const safeContent = sanitizeArticleContent(article.content);

    content.innerHTML = `
        <div class="help-article">
            <h1>${escapeHtml(article.title)}</h1>
            <div class="article-meta">By ${escapeHtml(article.author)} &middot; ${dateStr}</div>
            <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener" class="article-substack-link">
                📖 Read on Substack.com →
            </a>
            <hr>
            <div class="article-body">${safeContent}</div>
        </div>
    `;

    content.scrollTop = 0;
    if (status) status.textContent = article.title;

    if (!skipHistory) {
        substackHistory = substackHistory.slice(0, substackHistoryIndex + 1);
        substackHistory.push(index);
        substackHistoryIndex = substackHistory.length - 1;
        substackUpdateNavButtons();
    }
}

function substackGoBack() {
    if (substackHistoryIndex > 0) {
        substackHistoryIndex--;
        const target = substackHistory[substackHistoryIndex];
        if (target === 'home') substackShowHome(true);
        else substackOpenArticle(target, true);
        substackUpdateNavButtons();
    }
}

function substackGoForward() {
    if (substackHistoryIndex < substackHistory.length - 1) {
        substackHistoryIndex++;
        const target = substackHistory[substackHistoryIndex];
        if (target === 'home') substackShowHome(true);
        else substackOpenArticle(target, true);
        substackUpdateNavButtons();
    }
}

function substackUpdateNavButtons() {
    const back = document.getElementById('substack-back-btn');
    const fwd = document.getElementById('substack-fwd-btn');
    if (back) back.disabled = substackHistoryIndex <= 0;
    if (fwd) fwd.disabled = substackHistoryIndex >= substackHistory.length - 1;
}

function substackShowHome(skipHistory = false) {
    const content = document.getElementById('substack-content');
    if (!content) return;

    content.innerHTML = `
        <div class="help-welcome">
            <h1>Welcome to Donna's Substack</h1>
            <p class="help-subtitle">brain dump. mostly unfinished thoughts.</p>
            <hr>
            <p>Select an article from the list on the left to start reading.</p>
            <p class="help-tip">
                <strong>Tip:</strong> Prefer the native Substack experience?
                <a href="https://d0nnaq.substack.com/" target="_blank" rel="noopener">Read on Substack.com</a>
            </p>
        </div>
    `;

    document.querySelectorAll('#substack-tree .help-tree-item').forEach(item => item.classList.remove('active'));

    if (!skipHistory) {
        substackHistory = substackHistory.slice(0, substackHistoryIndex + 1);
        substackHistory.push('home');
        substackHistoryIndex = substackHistory.length - 1;
        substackUpdateNavButtons();
    }
}

function substackRefresh() {
    substackLoaded = false;
    substackHistory = [];
    substackHistoryIndex = -1;
    substackShowHome(true);
    substackFetchFeed();
    substackUpdateNavButtons();
}

function substackToggleSidebar() {
    const sidebar = document.getElementById('substack-sidebar');
    const splitter = document.getElementById('substack-splitter');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed');
    if (splitter) {
        splitter.style.display = sidebar.classList.contains('collapsed') ? 'none' : '';
    }
}

//helpers
function formatArticleDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeArticleContent(html) {
    if (!html) return '<p><em>No content available. Click the button above to read on Substack.</em></p>';
    let cleaned = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
    cleaned = cleaned.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
    cleaned = cleaned.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
    return cleaned;
}

window.substackOpenArticle = substackOpenArticle;
window.substackGoBack = substackGoBack;
window.substackGoForward = substackGoForward;
window.substackRefresh = substackRefresh;
window.substackToggleSidebar = substackToggleSidebar;

document.addEventListener('DOMContentLoaded', substackUpdateNavButtons);
