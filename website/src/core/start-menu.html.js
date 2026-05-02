export default `
<div id="start-menu" class="start-menu">

    <!-- Blue header with user profile -->
    <div class="start-header">
        <div class="start-avatar-wrap">
            <img src="/assets/images/avatar-start.png" alt="Donna" class="start-avatar">
        </div>
        <div class="start-username">Donna Mae Quinto</div>
    </div>

    <!-- Two-panel body -->
    <div class="start-body">

        <!-- LEFT PANEL: pinned apps -->
        <div class="start-left">
            <div class="start-item" onclick="startOpenWindow('about-window')">
                <img src="/assets/images/computer-icon.png" class="start-item-icon">
                <div class="start-item-text">
                    <div class="start-item-title">About Me</div>
                    <div class="start-item-subtitle">Learn more about me</div>
                </div>
            </div>

            <div class="start-item" onclick="startOpenWindow('substack-window')">
                <img src="/assets/images/pdf-icon.png" class="start-item-icon">
                <div class="start-item-text">
                    <div class="start-item-title">Substack</div>
                    <div class="start-item-subtitle">Read my articles</div>
                </div>
            </div>

            <div class="start-item" onclick="startOpenWindow('projects-window')">
                <img src="/assets/images/ie-icon.png" class="start-item-icon">
                <div class="start-item-text">
                    <div class="start-item-title">My Projects</div>
                    <div class="start-item-subtitle">View my work</div>
                </div>
            </div>

            <div class="start-item" onclick="startOpenWindow('contact-window')">
                <img src="/assets/images/mail-icon.png" class="start-item-icon">
                <div class="start-item-text">
                    <div class="start-item-title">Contact Me</div>
                    <div class="start-item-subtitle">Send me a message</div>
                </div>
            </div>

            <div class="start-separator"></div>

            <div class="start-item" onclick="startOpenWindow('paint-window')">
                <img src="/assets/images/paint-icon.png" class="start-item-icon">
                <div class="start-item-text">
                    <div class="start-item-title">Paint</div>
                    <div class="start-item-subtitle">Draw something</div>
                </div>
            </div>

            <div class="start-separator"></div>

            <!-- All Programs row with flyout submenu -->
            <div class="start-all-programs" id="start-all-programs">
                <span>All Programs</span>
                <span class="start-arrow">▶</span>

                <div class="start-flyout" id="start-flyout">
                    <div class="start-flyout-item" onclick="startOpenWindow('about-window')">
                        <img src="/assets/images/computer-icon.png" class="start-flyout-icon">
                        <span>About Me</span>
                    </div>
                    <div class="start-flyout-item" onclick="startOpenWindow('projects-window')">
                        <img src="/assets/images/ie-icon.png" class="start-flyout-icon">
                        <span>My Projects</span>
                    </div>
                    <div class="start-flyout-item" onclick="startOpenWindow('substack-window')">
                        <img src="/assets/images/pdf-icon.png" class="start-flyout-icon">
                        <span>Substack</span>
                    </div>
                    <div class="start-flyout-item" onclick="startOpenWindow('contact-window')">
                        <img src="/assets/images/mail-icon.png" class="start-flyout-icon">
                        <span>Contact Me</span>
                    </div>

                    <div class="start-flyout-separator"></div>

                    <div class="start-flyout-item" onclick="startOpenWindow('paint-window')">
                        <img src="/assets/images/paint-icon.png" class="start-flyout-icon">
                        <span>Paint</span>
                    </div>
                    <div class="start-flyout-item disabled">
                        <img src="/assets/images/media-player-icon.png" class="start-flyout-icon">
                        <span>Media Player</span>
                    </div>
                    <div class="start-flyout-item disabled">
                        <img src="/assets/images/music-player-icon.png" class="start-flyout-icon">
                        <span>Music Player</span>
                    </div>

                    <div class="start-flyout-separator"></div>

                    <div class="start-flyout-item" onclick="startOpenLink('https://x.com/eamannod_')">
                        <img src="/assets/images/x-icon.png" class="start-flyout-icon">
                        <span>X (Twitter)</span>
                    </div>
                    <div class="start-flyout-item" onclick="startOpenLink('https://github.com/')">
                        <img src="/assets/images/gh-icon.png" class="start-flyout-icon">
                        <span>Github</span>
                    </div>
                    <div class="start-flyout-item" onclick="startOpenLink('https://www.linkedin.com/in/donnamaequinto')">
                        <img src="/assets/images/li-icon.png" class="start-flyout-icon">
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- RIGHT PANEL: social links + utilities -->
        <div class="start-right">
            <div class="start-section-title">Social</div>

            <div class="start-mini-item" onclick="startOpenLink('https://x.com/eamannod_')">
                <img src="/assets/images/x-icon.png" class="start-mini-icon">
                <span>X (Twitter)</span>
            </div>

            <div class="start-mini-item" onclick="startOpenLink('https://github.com/')">
                <img src="/assets/images/gh-icon.png" class="start-mini-icon">
                <span>Github</span>
            </div>

            <div class="start-mini-item" onclick="startOpenLink('https://www.linkedin.com/in/donnamaequinto')">
                <img src="/assets/images/li-icon.png" class="start-mini-icon">
                <span>LinkedIn</span>
            </div>

            <div class="start-mini-separator"></div>

            <div class="start-mini-item" onclick="startOpenLink('https://d0nnaq.substack.com/')">
                <img src="/assets/images/pdf-icon.png" class="start-mini-icon">
                <span>Open on Substack</span>
            </div>
        </div>
    </div>

    <!-- Bottom bar with Log Off / Shut Down -->
    <div class="start-footer">
        <button class="start-footer-btn" onclick="startShutdown()">
            <span class="start-footer-icon logoff">⇄</span>
            <span>Log Off</span>
        </button>
        <button class="start-footer-btn" onclick="startShutdown()">
            <span class="start-footer-icon shutdown">⏻</span>
            <span>Shut Down</span>
        </button>
    </div>

</div>
`;