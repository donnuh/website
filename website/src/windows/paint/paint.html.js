export default `
<div id="paint-window" class="window paint-window" data-window-title="Paint" data-window-icon="/assets/images/paint-icon.png" style="display: none;">

    <div class="window-header">
        <div class="window-title">
            <img src="/assets/images/paint-icon.png" class="window-icon">
            untitled - Paint
        </div>
        <div class="window-controls">
            <button class="win-btn" onclick="minimizeWindow('paint-window')">_</button>
            <button class="win-btn" onclick="toggleMaximize('paint-window')">□</button>
            <button class="win-btn close" onclick="closeWindow('paint-window')">X</button>
        </div>
    </div>

    <div class="window-menubar">
        <div class="menu-item disabled-menu">File</div>
        <div class="menu-item disabled-menu">Edit</div>
        <div class="menu-item" onclick="toggleMenu(event)">
            View
            <div class="menu-dropdown">
                <div class="menu-option" onclick="toggleMaximize('paint-window')">Maximize</div>
                <div class="menu-option" onclick="minimizeWindow('paint-window')">Minimize</div>
            </div>
        </div>
        <div class="menu-item disabled-menu">Image</div>
        <div class="menu-item disabled-menu">Colors</div>
        <div class="menu-item disabled-menu">Help</div>
        <img src="/assets/images/xp-logo.png" class="menubar-logo" alt="">
    </div>

    <!--iframe src is set on first window open, not on page load-->
    <div class="paint-frame-wrap">
        <iframe
            id="paint-iframe"
            data-src="https://jspaint.app"
            class="paint-iframe"
            title="JS Paint">
        </iframe>
    </div>

    <div class="paint-statusbar">
        <span>Powered by JS Paint &mdash;</span>
        <a href="https://jspaint.app" target="_blank" rel="noopener">jspaint.app</a>
    </div>
</div>
`;