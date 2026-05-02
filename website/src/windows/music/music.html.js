export default `
<div id="music-window" class="window music-window" data-window-title="Windows Media Player" data-window-icon="/assets/images/music-player-icon.png" style="display: none;">

    <!--wmp uses its own custom title bar styling, but reuse standard one for now-->
    <div class="window-header music-header">
        <div class="window-title">
            <img src="/assets/images/music-player-icon.png" class="window-icon">
            Windows Media Player
        </div>
        <div class="window-controls">
            <button class="win-btn" onclick="minimizeWindow('music-window')">_</button>
            <button class="win-btn" onclick="toggleMaximize('music-window')">□</button>
            <button class="win-btn close" onclick="closeWindow('music-window')">X</button>
        </div>
    </div>

    <!--wmp menubar with tabs-->
    <div class="music-tab-row">
        <div class="music-tab active" data-tab="now-playing">Now Playing</div>
        <div class="music-tab" data-tab="library">Library</div>
        <div class="music-tab" data-tab="rip">Rip</div>
        <div class="music-tab" data-tab="burn">Burn</div>
        <div class="music-tab" data-tab="sync">Sync</div>
        <div class="music-tab" data-tab="guide">Guide</div>
    </div>

    <!--main 3 column body-->
    <div class="music-body">

        <!--left nav pane-->
        <div class="music-left-pane">
            <div class="music-nav-section">
                <div class="music-nav-title">Now Playing</div>
                <div class="music-nav-item active">Now Playing</div>
            </div>
            <div class="music-nav-section">
                <div class="music-nav-title">Library</div>
                <div class="music-nav-item">All Music</div>
                <div class="music-nav-item">Album</div>
                <div class="music-nav-item">Artist</div>
                <div class="music-nav-item">Genre</div>
            </div>
            <div class="music-nav-section">
                <div class="music-nav-title">Playlists</div>
                <div class="music-nav-item">My Playlists</div>
                <div class="music-nav-item">Auto Playlists</div>
            </div>
        </div>

        <!--center now playing area-->
        <div class="music-center-pane">
            <div class="music-now-playing-stage" id="music-stage">
                <img src="/assets/images/album-placeholder.png" class="music-album-art" id="music-album-art" alt="">
                <div class="music-stage-info">
                    <div class="music-stage-title" id="music-stage-title">No track loaded</div>
                    <div class="music-stage-artist" id="music-stage-artist">Select a song from the playlist</div>
                </div>
            </div>
        </div>

        <!--right playlist pane-->
        <div class="music-right-pane">
            <div class="music-playlist-header">
                <span>Playlist</span>
                <span class="music-track-count" id="music-track-count">0 items</span>
            </div>
            <div class="music-playlist" id="music-playlist">
                <!--track rows injected by js-->
            </div>
        </div>
    </div>

    <!--bottom transport controls-->
    <div class="music-transport">
        <div class="music-progress-row">
            <span class="music-time" id="music-time-current">0:00</span>
            <div class="music-progress-track" id="music-progress-track">
                <div class="music-progress-fill" id="music-progress-fill"></div>
                <div class="music-progress-thumb" id="music-progress-thumb"></div>
            </div>
            <span class="music-time" id="music-time-total">0:00</span>
        </div>

        <div class="music-controls-row">
            <button class="music-btn music-btn-prev" id="music-prev" title="Previous">
                <span class="music-icon-prev">⏮</span>
            </button>
            <button class="music-btn music-btn-play" id="music-play" title="Play/Pause">
                <span class="music-icon-play" id="music-play-icon">▶</span>
            </button>
            <button class="music-btn music-btn-stop" id="music-stop" title="Stop">
                <span class="music-icon-stop">■</span>
            </button>
            <button class="music-btn music-btn-next" id="music-next" title="Next">
                <span class="music-icon-next">⏭</span>
            </button>

            <div class="music-volume-group">
                <span class="music-icon-volume">🔊</span>
                <div class="music-volume-track" id="music-volume-track">
                    <div class="music-volume-fill" id="music-volume-fill"></div>
                </div>
            </div>
        </div>
    </div>

    <audio id="music-audio" preload="metadata"></audio>
</div>
`;