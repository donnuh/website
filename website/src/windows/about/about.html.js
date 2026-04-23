export default `
<div id="about-window" class="window" data-window-title="About Me" data-window-icon="/assets/images/computer-icon.png" style="display: none;">
    <div class="window-header">
        <div class="window-title">
            <img src="/assets/images/computer-icon.png" class="window-icon">
            About Me
        </div>
        <div class="window-controls">
            <button class="win-btn" onclick="minimizeWindow('about-window')">_</button>
            <button class="win-btn" onclick="toggleMaximize('about-window')">□</button>
            <button class="win-btn close" onclick="closeWindow('about-window')">X</button>
        </div>
    </div>

    <div class="window-menubar">
        <div class="menu-item" onclick="toggleMenu(event)">
            File
            <div class="menu-dropdown">
                <div class="menu-option disabled">Print</div>
                <div class="menu-option disabled">Print Setup</div>
                <div class="menu-separator"></div>
                <div class="menu-option" onclick="closeWindow('about-window')">Exit</div>
            </div>
        </div>
        <div class="menu-item" onclick="toggleMenu(event)">
            View
            <div class="menu-dropdown">
                <div class="menu-option" onclick="toggleMaximize('about-window')">Maximize</div>
                <div class="menu-option" onclick="minimizeWindow('about-window')">Minimize</div>
            </div>
        </div>
        <div class="menu-item disabled-menu">Help</div>
        <img src="/assets/images/xp-logo.png" class="menubar-logo" alt="">
    </div>

    <div class="window-toolbar">
        <div class="toolbar-btns">
            <button class="tool-btn">
                <img src="/assets/images/back-arrow.png"> Back
            </button>
            <button class="tool-btn">
                <img src="/assets/images/forward-arrow.png"> Forward
            </button>
            <div class="toolbar-divider"></div>
            <button class="tool-btn" onclick="openWindow('projects-window')">
                <img src="/assets/images/ie-icon.png"> My Projects
            </button>
            <button class="tool-btn" onclick="openWindow('substack-window')">
                <img src="/assets/images/pdf-icon.png"> Substack
            </button>
            <div class="toolbar-divider"></div>
            <button class="tool-btn icon-only">
                <img src="/assets/images/home-icon.png">
            </button>
        </div>
    </div>

    <div class="address-row">
        <span class="address-label">Address</span>
        <div class="address-bar">
            <img src="/assets/images/computer-icon.png" class="address-icon">
            <input type="text" value="About Me" readonly>
            <span class="address-dropdown">▼</span>
            <div class="address-progress"></div>
        </div>
        <button class="go-btn">
            <img src="/assets/images/go-arrow.png"> Go
        </button>
    </div>

    <div class="window-body ie-body">
        <div class="sidebar-panel">
            <div class="sidebar-box accordion active">
                <div class="box-header" onclick="toggleAccordion(this)">
                    Social Links <span class="acc-arrow">▼</span>
                </div>
                <div class="box-content">
                    <p><img src="/assets/images/x-icon.png"> X</p>
                    <p><img src="/assets/images/gh-icon.png"> Github</p>
                    <p><img src="/assets/images/li-icon.png"> LinkedIn</p>
                </div>
            </div>

            <div class="sidebar-box accordion">
                <div class="box-header" onclick="toggleAccordion(this)">
                    Skills <span class="acc-arrow">▶</span>
                </div>
                <div class="box-content" style="display:none;">
                    <p>Graphic Design</p>
                    <p>Web Design</p>
                    <p>UI/UX Design</p>
                    <p>Creative Thinking</p>
                </div>
            </div>
        </div>

        <div class="main-content-panel">
            <h1>About Me</h1>
            <div class="bio-section">
                <img src="/assets/images/avatar-wave.png" alt="Waving Avatar" class="bio-avatar">
                <p>I'm Donna, based in... placeholder.</p>
            </div>
            <div class="bio-section">
                <img src="/assets/images/avatar-allblacks.png" alt="Sporty Avatar" class="bio-avatar">
                <p>Growing up.... placeholder.</p>
            </div>
        </div>
    </div>
</div>
`;
