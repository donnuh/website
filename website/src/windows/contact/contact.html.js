export default `
<div id="contact-window" class="window contact-window" data-window-title="Contact Me" data-window-icon="/assets/images/mail-icon.png" style="display: none;">

    <div class="window-header">
        <div class="window-title">
            <img src="/assets/images/mail-icon.png" class="window-icon">
            Contact Me
        </div>
        <div class="window-controls">
            <button class="win-btn" onclick="minimizeWindow('contact-window')">_</button>
            <button class="win-btn" onclick="toggleMaximize('contact-window')">□</button>
            <button class="win-btn close" onclick="closeWindow('contact-window')">X</button>
        </div>
    </div>

    <div class="window-menubar">
        <div class="menu-item" onclick="toggleMenu(event)">
            File
            <div class="menu-dropdown">
                <div class="menu-option" onclick="contactSendMessage()">Send Message</div>
                <div class="menu-option" onclick="contactClearForm()">New Message</div>
                <div class="menu-separator"></div>
                <div class="menu-option disabled">Print</div>
                <div class="menu-option disabled">Print Setup</div>
                <div class="menu-separator"></div>
                <div class="menu-option" onclick="closeWindow('contact-window')">Exit</div>
            </div>
        </div>
        <div class="menu-item disabled-menu">Edit</div>
        <div class="menu-item" onclick="toggleMenu(event)">
            View
            <div class="menu-dropdown">
                <div class="menu-option" onclick="toggleMaximize('contact-window')">Maximize</div>
                <div class="menu-option" onclick="minimizeWindow('contact-window')">Minimize</div>
            </div>
        </div>
        <div class="menu-item disabled-menu">Tools</div>
        <div class="menu-item disabled-menu">Help</div>
        <img src="/assets/images/xp-logo.png" class="menubar-logo" alt="">
    </div>

    <!-- Outlook Express-style toolbar -->
    <div class="contact-toolbar">
        <button class="contact-tool-btn" onclick="contactSendMessage()" title="Send Message">
            <div class="contact-tool-icon send"></div>
            <span>Send Message</span>
        </button>
        <button class="contact-tool-btn" onclick="contactClearForm()" title="New Message">
            <div class="contact-tool-icon new"></div>
            <span>New Message</span>
        </button>

        <div class="contact-toolbar-divider"></div>

        <button class="contact-tool-btn icon-only" onclick="contactCut()" title="Cut">
            <div class="contact-tool-icon cut"></div>
        </button>
        <button class="contact-tool-btn icon-only" onclick="contactCopy()" title="Copy">
            <div class="contact-tool-icon copy"></div>
        </button>
        <button class="contact-tool-btn icon-only" onclick="contactPaste()" title="Paste">
            <div class="contact-tool-icon paste"></div>
        </button>

        <div class="contact-toolbar-divider"></div>

        <button class="contact-tool-btn" onclick="contactOpenLinkedIn()" title="Open LinkedIn">
            <img src="/assets/images/li-icon.png" class="contact-tool-linkedin">
            <span>LinkedIn</span>
        </button>
    </div>

    <!-- Compose form -->
    <div class="contact-body">
        <div class="contact-field-row">
            <label class="contact-label">To:</label>
            <div class="contact-input-wrap readonly">
                <input type="text" value="Donna Mae Quinto <donnamaequinto@example.com>" readonly id="contact-to">
            </div>
        </div>

        <div class="contact-field-row">
            <label class="contact-label">From:</label>
            <div class="contact-input-wrap">
                <input type="email" placeholder="Your email address" id="contact-from" autocomplete="email">
            </div>
        </div>

        <div class="contact-field-row">
            <label class="contact-label">Subject:</label>
            <div class="contact-input-wrap">
                <input type="text" placeholder="Subject of your message" id="contact-subject">
            </div>
        </div>

        <div class="contact-message-wrap">
            <textarea placeholder="Write your message here" id="contact-message"></textarea>
        </div>
    </div>

    <div class="contact-statusbar" id="contact-status">Compose a message to Donna</div>
</div>
`;