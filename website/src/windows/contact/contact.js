//Contact me window- uses mailto to open the visitor's email client
import contactHTML from './contact.html.js';

const container = document.getElementById('windows-container');
if (container) {
    container.insertAdjacentHTML('beforeend', contactHTML);
}

const CONTACT_EMAIL = 'donnamaequinto0@gmail.com';
const CONTACT_NAME = 'Donna Mae Quinto';
const LINKEDIN_URL = 'https://www.linkedin.com/in/donnamaequinto';

function contactSendMessage() {
    const from = document.getElementById('contact-from').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const status = document.getElementById('contact-status');

    //minimal validation
    if (!subject && !message) {
        if (status) status.textContent = 'Please enter a subject and message before sending.';
        return;
    }

    //build the mailto URL
    const finalSubject = subject || '(no subject)';
    const bodyLines = [];
    if (message) bodyLines.push(message);
    if (from) {
        bodyLines.push('');
        bodyLines.push('---');
        bodyLines.push(`From: ${from}`);
    }
    const body = bodyLines.join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;

    //trigger the mail client
    window.location.href = mailto;

    if (status) status.textContent = 'Opening your email client...';
}

function contactClearForm() {
    document.getElementById('contact-from').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
    const status = document.getElementById('contact-status');
    if (status) status.textContent = 'New message started.';
    document.getElementById('contact-from').focus();
}

function contactOpenLinkedIn() {
    window.open(LINKEDIN_URL, '_blank', 'noopener');
}

//clipboard actions
function contactGetFocusedField() {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        //only editable ones
        if (active.readOnly) return null;
        return active;
    }
    return null;
}

function contactCut() {
    const field = contactGetFocusedField();
    if (!field) return;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    if (start === end) return;

    const selected = field.value.substring(start, end);
    navigator.clipboard.writeText(selected).catch(() => {});
    field.value = field.value.substring(0, start) + field.value.substring(end);
    field.selectionStart = field.selectionEnd = start;
    field.focus();
}

function contactCopy() {
    const field = contactGetFocusedField();
    if (!field) return;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    if (start === end) return;

    const selected = field.value.substring(start, end);
    navigator.clipboard.writeText(selected).catch(() => {});
}

function contactPaste() {
    const field = contactGetFocusedField();
    if (!field) return;

    navigator.clipboard.readText().then(text => {
        const start = field.selectionStart;
        const end = field.selectionEnd;
        field.value = field.value.substring(0, start) + text + field.value.substring(end);
        field.selectionStart = field.selectionEnd = start + text.length;
        field.focus();
    }).catch(() => {
        const status = document.getElementById('contact-status');
        if (status) status.textContent = 'Paste unavailable — clipboard permission denied.';
    });
}

window.contactSendMessage = contactSendMessage;
window.contactClearForm = contactClearForm;
window.contactOpenLinkedIn = contactOpenLinkedIn;
window.contactCut = contactCut;
window.contactCopy = contactCopy;
window.contactPaste = contactPaste;