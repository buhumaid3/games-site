/* ============================================
   GAME PAGE LOGIC
   Reads ?id= from URL, loads matching game
   ============================================ */

// Get game ID from URL
function getGameIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Find game in GAMES array
function findGame(id) {
  return GAMES.find(g => g.id === id);
}

// Load the game
function loadGame() {
  const id = getGameIdFromURL();
  const game = findGame(id);

  if (!game) {
    document.getElementById("gameTitle").textContent = "Game not found";
    document.getElementById("gameLoading").innerHTML = `
      <p>This game doesn't exist. <a href="/" style="color: var(--accent);">Go back home</a></p>
    `;
    return;
  }

  // Update page metadata
  document.title = `${game.title} — Play free on MathDen`;
  document.getElementById("gameTitle").textContent = game.title;

  // Load iframe
  const iframe = document.getElementById("gameFrame");
  const loading = document.getElementById("gameLoading");

  if (!game.iframe) {
    loading.innerHTML = `<p>Game coming soon — iframe not yet configured.</p>`;
    return;
  }

  iframe.src = game.iframe;
  iframe.addEventListener("load", () => {
    loading.classList.add("hidden");
  });

  // Track in Recently Played
  trackRecentlyPlayed(game);
}

// Track recently played games
function trackRecentlyPlayed(game) {
  try {
    let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
    recent = recent.filter(g => g.id !== game.id); // remove duplicates
    recent.unshift({ id: game.id, title: game.title, thumbnail: game.thumbnail, category: game.category });
    recent = recent.slice(0, 6); // keep only last 6
    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
  } catch (e) {
    console.warn("localStorage not available");
  }
}

// Render "More Games" section — 8 random games excluding current
function renderMoreGames() {
  const currentId = getGameIdFromURL();
  const others = GAMES.filter(g => g.id !== currentId);
  
  // Shuffle and take 8
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 8);
  
  const grid = document.getElementById("moreGamesGrid");
  grid.innerHTML = "";
  shuffled.forEach(game => {
    const card = document.createElement("a");
    card.href = `game.html?id=${game.id}`;
    card.className = "game-card";
    card.innerHTML = `
      <img class="game-card-thumb" src="${game.thumbnail}" alt="${game.title}" loading="lazy">
      <div class="game-card-body">
        <div class="game-card-title">${game.title}</div>
        <div class="game-card-tag">${game.category}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Fullscreen button handler
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const container = document.getElementById("frameContainer");
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    container.requestFullscreen().catch(err => {
      console.warn("Fullscreen failed:", err);
    });
  }
});

// Search bar redirects to homepage with query
document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = e.target.value.trim();
    if (q) window.location.href = `/?search=${encodeURIComponent(q)}`;
  }
});

// Initialize
loadGame();
renderMoreGames();