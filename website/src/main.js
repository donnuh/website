//core window management
import './core/window-manager.js';
import './core/taskbar.js';
import './core/menus.js';
import './core/start-menu.js';

//window module — each injects its own HTML and wires upthe behaviour
import './windows/about/about.js';
import './windows/substack/substack.js';
import './windows/contact/contact.js';

//after all windows are in the DOM, attach drag + focus handlers
import { initAllWindows } from './core/window-manager.js';
initAllWindows();
