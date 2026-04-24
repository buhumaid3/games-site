/* ============================================
   MATHDEN GAME DATABASE — v2 (30 games)
   ============================================ */

const GAMES = [
  // ============ ACTION ============
  {
    id: "ball-rolling-slope",
    title: "Ball Rolling Slope",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/0022998ce3c54962be6ffe178229b168-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/0022998ce3c54962be6ffe178229b168/?gd_sdk_referrer_url=https://gamedistribution.com/games/slope-3d/",
    description: "Navigate a rolling ball through endless neon slopes.",
  },
  {
    id: "slope-run",
    title: "Slope Run",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/b82efa0f9d7648beb126d62c0fb9363d-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/b82efa0f9d7648beb126d62c0fb9363d/?gd_sdk_referrer_url=https://gamedistribution.com/games/slope-run/",
    description: "Join a ball on an exciting journey to restore lost memories.",
  },
  {
    id: "endless-tunnel",
    title: "Endless Tunnel",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/0a9d64ab961d44c492509108d7f31cf4-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/0a9d64ab961d44c492509108d7f31cf4/?gd_sdk_referrer_url=https://gamedistribution.com/games/endless-tunnel/",
    description: "Race forever through a neon 3D tunnel as a speeding cube.",
  },
  {
    id: "rail-runner",
    title: "Rail Runner",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/559dae07921c4f629fe308dc9d996041-1280x720.jpeg",
    iframe: "https://html5.gamedistribution.com/559dae07921c4f629fe308dc9d996041/?gd_sdk_referrer_url=https://gamedistribution.com/games/subway-runner-1/",
    description: "Run as far as you can, dodge obstacles, unlock achievements.",
  },
  {
    id: "temple-quest",
    title: "Temple Quest",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/138a14d646474409b0504f4609bf6581-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/138a14d646474409b0504f4609bf6581/?gd_sdk_referrer_url=https://gamedistribution.com/games/temple-quest/",
    description: "Run for your life in an endless maze of temple ruins.",
  },
  {
    id: "red-ball",
    title: "Red Ball",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/32af13d16f154eb0aed27540799101a9-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/32af13d16f154eb0aed27540799101a9/?gd_sdk_referrer_url=https://gamedistribution.com/games/red-ball-christmas/",
    description: "Roll and jump your way through levels, defeating enemies.",
  },
  {
    id: "stick-kill-3d",
    title: "Stick Kill 3D",
    category: "Action",
    thumbnail: "https://img.gamedistribution.com/724f9f245a0e47308239bf37795141e6-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/724f9f245a0e47308239bf37795141e6/?gd_sdk_referrer_url=https://gamedistribution.com/games/stick-kill-3d/",
    description: "Aim, shoot, solve — a stickman puzzle shooter with clever twists.",
  },

  // ============ PUZZLE ============
  {
    id: "2048-merge-world",
    title: "2048 Merge World",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/a8ecea31288d4f6581ae36db798ce9ac-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/a8ecea31288d4f6581ae36db798ce9ac/?gd_sdk_referrer_url=https://gamedistribution.com/games/2048-merge-world/",
    description: "Strategize and merge numbers to build bigger and better values.",
  },
  {
    id: "seat-puzzle-cut-the-rope",
    title: "Seat Puzzle: Cut The Rope",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/24becac37a04406c8f6c44c28513c09c-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/24becac37a04406c8f6c44c28513c09c/?gd_sdk_referrer_url=https://gamedistribution.com/games/seat-puzzle-cut-the-rope/",
    description: "Cut ropes in the right order to seat every passenger correctly.",
  },
  {
    id: "sudoku",
    title: "Sudoku",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/f10741d38dc54325b4385bb3e632ee59-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/f10741d38dc54325b4385bb3e632ee59/?gd_sdk_referrer_url=https://gamedistribution.com/games/sudoku-4/",
    description: "Fill the 9x9 grid with numbers 1-9 — no repeats in rows, columns, or boxes.",
  },
  {
    id: "candy-match-saga-2",
    title: "Candy Match Saga 2",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/e01b0accb33540968eed27ff6eb8682f-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/e01b0accb33540968eed27ff6eb8682f/?gd_sdk_referrer_url=https://gamedistribution.com/games/candy-match-saga-2/",
    description: "Help the little witch solve Match 3 puzzles with epic power-ups.",
  },
  {
    id: "puzzle-blocks",
    title: "Puzzle Blocks",
    category: "Puzzle",
    thumbnail: "https://img.gamedistribution.com/8b2128d383444348804bd88f50e32283-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/8b2128d383444348804bd88f50e32283/?gd_sdk_referrer_url=https://gamedistribution.com/games/puzzle-blocks-1/",
    description: "Drop blocks, clear lines, and chase your highest score.",
  },

  // ============ RACING ============
  {
    id: "i8-city-driver",
    title: "i8 City Driver",
    category: "Racing",
    thumbnail: "https://img.gamedistribution.com/f6acd919192c441c9aca2d20a18e04c6-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/f6acd919192c441c9aca2d20a18e04c6/?gd_sdk_referrer_url=https://gamedistribution.com/games/i8-city-driver/",
    description: "Skid through a stunning morning city in a roaring supercar.",
  },
  {
    id: "crazy-stunts-3d",
    title: "Crazy Stunts 3D",
    category: "Racing",
    thumbnail: "https://img.gamedistribution.com/7003f00653b24b0686c8d448eca7083b-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/7003f00653b24b0686c8d448eca7083b/?gd_sdk_referrer_url=https://gamedistribution.com/games/crazy-stunts-3d/",
    description: "Conquer extreme tracks, jump off ramps, and unlock wild cars.",
  },
  {
    id: "moto-traffic-rider",
    title: "Moto Traffic Rider",
    category: "Racing",
    thumbnail: "https://img.gamedistribution.com/9bde41f232834eff9ea81554ecee8279-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/9bde41f232834eff9ea81554ecee8279/?gd_sdk_referrer_url=https://gamedistribution.com/games/moto-traffic-rider/",
    description: "Throttle 6 superbikes through highways at insane speeds.",
  },
  {
    id: "moto-attack",
    title: "Moto Attack",
    category: "Racing",
    thumbnail: "https://img.gamedistribution.com/cd5c068325f24c17b787a29db2eb1765-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/cd5c068325f24c17b787a29db2eb1765/?gd_sdk_referrer_url=https://gamedistribution.com/games/moto-attack/",
    description: "Race, shoot, and battle through enemy waves in a weaponized car.",
  },
  {
    id: "real-car-parking-simulator",
    title: "Real Car Parking Simulator",
    category: "Racing",
    thumbnail: "https://img.gamedistribution.com/6ddcb4f6691148499aa0dbdb682290bb-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/6ddcb4f6691148499aa0dbdb682290bb/?gd_sdk_referrer_url=https://gamedistribution.com/games/real-car-parking-simulator/",
    description: "Test your driving skills in realistic parking challenges.",
  },

  // ============ MULTIPLAYER ============
  {
    id: "paper-io-2",
    title: "Paper.io 2",
    category: "Multiplayer",
    thumbnail: "https://img.gamedistribution.com/5f0b3c36e5204917a1d23e8685a7015e-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/5f0b3c36e5204917a1d23e8685a7015e/?gd_sdk_referrer_url=https://gamedistribution.com/games/paper.io-2",
    description: "Capture territory, outsmart opponents, conquer the map.",
  },
  {
    id: "2048-mayhem-io",
    title: "2048 Mayhem.io",
    category: "Multiplayer",
    thumbnail: "https://img.gamedistribution.com/055561e9c9da4e69b8a724d06500fdd6-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/055561e9c9da4e69b8a724d06500fdd6/?gd_sdk_referrer_url=https://gamedistribution.com/games/2048-mayhem.io",
    description: "Classic 2048 puzzles collide with snake-style .io survival.",
  },
  {
    id: "blob-hero",
    title: "Blob Hero",
    category: "Multiplayer",
    thumbnail: "https://img.gamedistribution.com/cdf1ceb50bf8436db921c02172d2fc08-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/cdf1ceb50bf8436db921c02172d2fc08/?gd_sdk_referrer_url=https://gamedistribution.com/games/blob-hero/",
    description: "Become a blob hero and survive endless waves of monsters.",
  },
  {
    id: "wormate-2",
    title: "Wormate 2",
    category: "Multiplayer",
    thumbnail: "https://img.gamedistribution.com/33ec99293a794feabf6f576ac46c2189-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/33ec99293a794feabf6f576ac46c2189/?gd_sdk_referrer_url=https://gamedistribution.com/games/io-games-wormate-2/",
    description: "Grow the biggest worm and dominate the arena.",
  },

  // ============ SPORTS ============
  {
    id: "basketball-legends",
    title: "Basketball Legends 2020",
    category: "Sports",
    thumbnail: "https://img.gamedistribution.com/3dbd133d0cd9468bafdf2c9812290f4b-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/3dbd133d0cd9468bafdf2c9812290f4b/?gd_sdk_referrer_url=https://gamedistribution.com/games/basketball-legends-2020/",
    description: "Pick a team and dominate tournaments or quick matches with friends.",
  },
  {
    id: "soccer-duel",
    title: "Soccer Duel",
    category: "Sports",
    thumbnail: "https://img.gamedistribution.com/3c96c6a76dc94cedbe3d4bc519e0a7ce-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/3c96c6a76dc94cedbe3d4bc519e0a7ce/?gd_sdk_referrer_url=https://gamedistribution.com/games/soccer-duel/",
    description: "Table football with solo, co-op, and online modes.",
  },
  {
    id: "8-ball-pro",
    title: "8 Ball Pro",
    category: "Sports",
    thumbnail: "https://img.gamedistribution.com/20fa5406b00643128250478502fa5453-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/20fa5406b00643128250478502fa5453/?gd_sdk_referrer_url=https://gamedistribution.com/games/8-ball-pro/",
    description: "Sink all your balls and the black 8 — beat the computer or a friend.",
  },
  {
    id: "football-masters",
    title: "Football Masters",
    category: "Sports",
    thumbnail: "https://img.gamedistribution.com/38396a4cf1064adc961e704c9893a494-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/38396a4cf1064adc961e704c9893a494/?gd_sdk_referrer_url=https://gamedistribution.com/games/football-masters/",
    description: "Choose your team and fight for the championship title.",
  },

  // ============ CLASSIC ============
  {
    id: "tetro-merge",
    title: "Tetro Merge",
    category: "Classic",
    thumbnail: "https://img.gamedistribution.com/8f07339e65ae4c739e1c406da7c51e26-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/8f07339e65ae4c739e1c406da7c51e26/?gd_sdk_referrer_url=https://gamedistribution.com/games/tetro-merge/",
    description: "A perfect blend of strategy, physics, and Tetris nostalgia.",
  },
  {
    id: "pac-hero",
    title: "Pac Hero",
    category: "Classic",
    thumbnail: "https://img.gamedistribution.com/9f080861ac6849669b0227ec3c2b75de-512x512.jpeg",
    iframe: "https://html5.gamedistribution.com/9f080861ac6849669b0227ec3c2b75de/?gd_sdk_referrer_url=https://gamedistribution.com/games/pac-hero/",
    description: "Dodge monsters and collect every dot to clear each map.",
  },
  {
    id: "snake",
    title: "Snake",
    category: "Classic",
    thumbnail: "https://img.gamedistribution.com/b73efc1f47194a4cbb5d0af8b492187b-512x384.jpg",
    iframe: "https://html5.gamedistribution.com/b73efc1f47194a4cbb5d0af8b492187b/?gd_sdk_referrer_url=https://gamedistribution.com/games/coe-snake/",
    description: "Collect fruits, dodge meteors, walls, bombs, and bouncing balls.",
  },

  // ============ SHOOTING ============
  {
    id: "dino-egg-shooter",
    title: "Dino Egg Shooter",
    category: "Shooting",
    thumbnail: "https://img.gamedistribution.com/0695b9f8773a4bfc8caf9cda8a812c2e-512x512.jpg",
    iframe: "https://html5.gamedistribution.com/0695b9f8773a4bfc8caf9cda8a812c2e/?gd_sdk_referrer_url=https://gamedistribution.com/games/dino-egg-shooter/",
    description: "Aim and shoot colorful dino eggs across 100 levels of rising difficulty.",
  },
  {
    id: "zombie-shooter-3d",
    title: "Zombie Shooter 3D",
    category: "Shooting",
    thumbnail: "https://img.gamedistribution.com/b42d9c5983134c19a5a074eb78b40c31-512x384.jpeg",
    iframe: "https://html5.gamedistribution.com/b42d9c5983134c19a5a074eb78b40c31/?gd_sdk_referrer_url=https://gamedistribution.com/games/zombie-shooter-3d-1/",
    description: "Defend the world from a zombie invasion. Destroy them all.",
  },
];

// Extract unique categories for filter tabs
const CATEGORIES = ["All", ...new Set(GAMES.map(g => g.category))];