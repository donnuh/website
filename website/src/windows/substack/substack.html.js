export default `
<div id="substack-window" class="window help-window" data-window-title="Substack" data-window-icon="/assets/images/pdf-icon.png" style="display: none;">

    <div class="window-header">
        <div class="window-title">
            <img src="/assets/images/pdf-icon.png" class="window-icon">
            Substack - Donna
        </div>
        <div class="window-controls">
            <button class="win-btn" onclick="minimizeWindow('substack-window')">_</button>
            <button class="win-btn" onclick="toggleMaximize('substack-window')">□</button>
            <button class="win-btn close" onclick="closeWindow('substack-window')">X</button>
        </div>
    </div>

    <div class="window-menubar">
        <div class="menu-item" onclick="toggleMenu(event)">
            File
            <div class="menu-dropdown">
                <div class="menu-option disabled">Print</div>
                <div class="menu-option disabled">Print Setup</div>
                <div class="menu-separator"></div>
                <div class="menu-option" onclick="closeWindow('substack-window')">Exit</div>
            </div>
        </div>
        <div class="menu-item" onclick="toggleMenu(event)">
            View
            <div class="menu-dropdown">
                <div class="menu-option" onclick="toggleMaximize('substack-window')">Maximize</div>
                <div class="menu-option" onclick="minimizeWindow('substack-window')">Minimize</div>
            </div>
        </div>
        <div class="menu-item disabled-menu">Help</div>
        <img src="/assets/images/xp-logo.png" class="menubar-logo" alt="">
    </div>

    <div class="help-toolbar">
        <button class="help-tool-btn" onclick="substackToggleSidebar()" title="Hide Contents">
            <span class="help-icon">⊟</span>
            <span>Hide</span>
        </button>
        <button class="help-tool-btn" id="substack-back-btn" onclick="substackGoBack()" title="Back">
            <span class="help-icon">◀</span>
            <span>Back</span>
        </button>
        <button class="help-tool-btn" id="substack-fwd-btn" onclick="substackGoForward()" title="Forward">
            <span class="help-icon">▶</span>
            <span>Forward</span>
        </button>
        <div class="help-toolbar-divider"></div>
        <button class="help-tool-btn" onclick="substackRefresh()" title="Refresh">
            <span class="help-icon">↻</span>
            <span>Refresh</span>
        </button>
        <button class="help-tool-btn" onclick="window.open('https://d0nnaq.substack.com/', '_blank', 'noopener')" title="Open on Substack">
            <span class="help-icon">🌐</span>
            <span>Web</span>
        </button>
    </div>

    <div class="help-body">
        <div class="help-sidebar" id="substack-sidebar">
            <div class="help-tabs">
                <div class="help-tab active">Contents</div>
            </div>
            <div class="help-tree" id="substack-tree">
                <div class="help-tree-loading">Loading articles...</div>
            </div>
        </div>

        <div class="help-splitter" id="substack-splitter"></div>

        <div class="help-content" id="substack-content">
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
        </div>
    </div>

    <div class="help-statusbar" id="substack-status">Ready</div>
</div>
`;
