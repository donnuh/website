//wmp9 style music player
import musicHTML from './music.html.js';

const container = document.getElementById('windows-container');
if (container) {
    container.insertAdjacentHTML('beforeend', musicHTML);
}

//placeholder track list, replace with real tracks later
//expected format: title, artist, src (path to mp3 in /assets/audio/), albumArt
const tracks = [
    {
        title: 'Track One',
        artist: 'Donna Mae Quinto',
        src: '/assets/audio/track-1.mp3',
        albumArt: '/assets/images/album-placeholder.png'
    },
    {
        title: 'Track Two',
        artist: 'Donna Mae Quinto',
        src: '/assets/audio/track-2.mp3',
        albumArt: '/assets/images/album-placeholder.png'
    },
    {
        title: 'Track Three',
        artist: 'Donna Mae Quinto',
        src: '/assets/audio/track-3.mp3',
        albumArt: '/assets/images/album-placeholder.png'
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isDraggingProgress = false;

const audio = document.getElementById('music-audio');
const playIcon = document.getElementById('music-play-icon');
const stageTitle = document.getElementById('music-stage-title');
const stageArtist = document.getElementById('music-stage-artist');
const albumArt = document.getElementById('music-album-art');
const trackCount = document.getElementById('music-track-count');
const playlist = document.getElementById('music-playlist');
const progressTrack = document.getElementById('music-progress-track');
const progressFill = document.getElementById('music-progress-fill');
const progressThumb = document.getElementById('music-progress-thumb');
const timeCurrent = document.getElementById('music-time-current');
const timeTotal = document.getElementById('music-time-total');
const volumeTrack = document.getElementById('music-volume-track');
const volumeFill = document.getElementById('music-volume-fill');

function renderPlaylist() {
    if (!playlist) return;
    playlist.innerHTML = tracks.map((t, i) => `
        <div class="music-playlist-row ${i === currentTrackIndex ? 'active' : ''}" data-index="${i}">
            <span class="music-playlist-num">${i + 1}</span>
            <div class="music-playlist-text">
                <div class="music-playlist-title">${escapeHtml(t.title)}</div>
                <div class="music-playlist-artist">${escapeHtml(t.artist)}</div>
            </div>
        </div>
    `).join('');

    if (trackCount) {
        trackCount.textContent = tracks.length === 1 ? '1 item' : `${tracks.length} items`;
    }

    //wire up clicks
    playlist.querySelectorAll('.music-playlist-row').forEach(row => {
        row.addEventListener('dblclick', () => {
            const idx = parseInt(row.dataset.index);
            loadTrack(idx);
            playTrack();
        });
        row.addEventListener('click', () => {
            playlist.querySelectorAll('.music-playlist-row').forEach(r => r.classList.remove('selected'));
            row.classList.add('selected');
        });
    });
}

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[index];

    if (audio) audio.src = track.src;
    if (stageTitle) stageTitle.textContent = track.title;
    if (stageArtist) stageArtist.textContent = track.artist;
    if (albumArt) albumArt.src = track.albumArt;

    //refresh active highlight
    playlist.querySelectorAll('.music-playlist-row').forEach((r, i) => {
        r.classList.toggle('active', i === index);
    });
}

function playTrack() {
    if (!audio || !audio.src) return;
    audio.play().catch(err => {
        console.warn('Audio play failed:', err);
    });
    isPlaying = true;
    if (playIcon) playIcon.textContent = '❚❚';
}

function pauseTrack() {
    if (!audio) return;
    audio.pause();
    isPlaying = false;
    if (playIcon) playIcon.textContent = '▶';
}

function togglePlay() {
    if (!audio.src && tracks.length > 0) {
        loadTrack(0);
        playTrack();
        return;
    }
    if (isPlaying) pauseTrack();
    else playTrack();
}

function stopTrack() {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    if (playIcon) playIcon.textContent = '▶';
    updateProgress();
}

function nextTrack() {
    let nextIdx = currentTrackIndex + 1;
    if (nextIdx >= tracks.length) nextIdx = 0;
    loadTrack(nextIdx);
    if (isPlaying) playTrack();
}

function prevTrack() {
    let prevIdx = currentTrackIndex - 1;
    if (prevIdx < 0) prevIdx = tracks.length - 1;
    loadTrack(prevIdx);
    if (isPlaying) playTrack();
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgress() {
    if (!audio) return;
    const cur = audio.currentTime || 0;
    const tot = audio.duration || 0;
    const pct = tot > 0 ? (cur / tot) * 100 : 0;

    if (!isDraggingProgress && progressFill) progressFill.style.width = pct + '%';
    if (!isDraggingProgress && progressThumb) progressThumb.style.left = pct + '%';
    if (timeCurrent) timeCurrent.textContent = formatTime(cur);
    if (timeTotal) timeTotal.textContent = formatTime(tot);
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

//wire audio events
if (audio) {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', nextTrack);
}

//transport buttons
document.getElementById('music-play')?.addEventListener('click', togglePlay);
document.getElementById('music-stop')?.addEventListener('click', stopTrack);
document.getElementById('music-next')?.addEventListener('click', nextTrack);
document.getElementById('music-prev')?.addEventListener('click', prevTrack);

//progress bar seeking
function seekTo(e) {
    if (!audio || !progressTrack || !audio.duration) return;
    const rect = progressTrack.getBoundingClientRect();
    let pct = (e.clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    audio.currentTime = pct * audio.duration;
    if (progressFill) progressFill.style.width = (pct * 100) + '%';
    if (progressThumb) progressThumb.style.left = (pct * 100) + '%';
}

if (progressTrack) {
    progressTrack.addEventListener('mousedown', (e) => {
        isDraggingProgress = true;
        seekTo(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) seekTo(e);
    });
    document.addEventListener('mouseup', () => {
        if (isDraggingProgress) isDraggingProgress = false;
    });
}

//volume control
function setVolume(e) {
    if (!audio || !volumeTrack) return;
    const rect = volumeTrack.getBoundingClientRect();
    let pct = (e.clientX - rect.left) / rect.width;
    pct = Math.max(0, Math.min(1, pct));
    audio.volume = pct;
    if (volumeFill) volumeFill.style.width = (pct * 100) + '%';
}

if (volumeTrack) {
    let isVolDragging = false;
    volumeTrack.addEventListener('mousedown', (e) => {
        isVolDragging = true;
        setVolume(e);
    });
    document.addEventListener('mousemove', (e) => {
        if (isVolDragging) setVolume(e);
    });
    document.addEventListener('mouseup', () => { isVolDragging = false; });

    //initial volume display 70%
    if (audio) audio.volume = 0.7;
    if (volumeFill) volumeFill.style.width = '70%';
}

//tabs are visual only for now
document.querySelectorAll('.music-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.music-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

renderPlaylist();