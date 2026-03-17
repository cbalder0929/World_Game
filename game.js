/* ============================================
   WORDLE CLONE — GAME LOGIC
   ============================================ */

(function () {
  "use strict";

  // ─── WORD LIST ────────────────────────────────────────────
  const WORDS = [
    "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
    "agent", "agree", "ahead", "alarm", "album", "alert", "alien", "align", "alive", "alley",
    "allow", "alone", "along", "alter", "angel", "anger", "angle", "angry", "apart", "apple",
    "apply", "arena", "argue", "arise", "armor", "array", "aside", "asset", "atlas", "avoid",
    "badge", "basic", "basin", "basis", "batch", "beach", "beard", "beast", "begin", "being",
    "below", "bench", "birth", "black", "blade", "blame", "bland", "blank", "blast", "blaze",
    "bleed", "blend", "bless", "blind", "block", "blood", "bloom", "blown", "blues", "bluff",
    "board", "boast", "bonus", "booth", "bound", "brain", "brand", "brave", "bread", "break",
    "breed", "brick", "bride", "brief", "bring", "broad", "broke", "brook", "brown", "brush",
    "build", "built", "bunch", "burst", "buyer", "cabin", "candy", "cargo", "carry", "catch",
    "cause", "cease", "chain", "chair", "chalk", "chaos", "charm", "chart", "chase", "cheap",
    "check", "cheek", "cheer", "chess", "chest", "chief", "child", "china", "choir", "chunk",
    "civic", "civil", "claim", "clash", "class", "clean", "clear", "clerk", "click", "cliff",
    "climb", "cling", "clock", "clone", "close", "cloth", "cloud", "coach", "coast", "color",
    "comet", "comic", "coral", "count", "could", "court", "cover", "crack", "craft", "crane",
    "crash", "crazy", "cream", "crime", "crisp", "cross", "crowd", "crown", "crush", "curve",
    "cycle", "daily", "dance", "death", "debug", "decay", "delay", "delta", "dense", "depth",
    "devil", "diary", "dirty", "donor", "doubt", "dough", "draft", "drain", "drake", "drama",
    "drank", "dream", "dress", "drift", "drink", "drive", "drums", "drunk", "dying", "eager",
    "eagle", "early", "earth", "eight", "elder", "elect", "elite", "empty", "enemy", "enjoy",
    "enter", "equal", "equip", "error", "essay", "event", "every", "exact", "exile", "exist",
    "extra", "fable", "faith", "false", "fancy", "fatal", "fault", "feast", "fence", "fever",
    "fiber", "field", "fifth", "fifty", "fight", "final", "first", "fixed", "flame", "flash",
    "fleet", "flesh", "float", "flood", "floor", "flour", "fluid", "flush", "focus", "force",
    "forge", "forth", "forum", "found", "frame", "frank", "fraud", "fresh", "front", "frost",
    "fruit", "fully", "fungi", "ghost", "giant", "given", "glass", "gleam", "globe", "gloom",
    "glory", "glove", "going", "grace", "grade", "grain", "grand", "grant", "grape", "grasp",
    "grass", "grave", "great", "green", "greet", "grief", "grill", "grind", "groan", "groom",
    "gross", "group", "grove", "grown", "guard", "guess", "guide", "guilt", "guitar", "gusty",
    "habit", "handy", "happy", "harsh", "haste", "haven", "heart", "heavy", "hedge", "hence",
    "herbs", "hoist", "honor", "horse", "hotel", "house", "human", "humor", "hyper", "ideal",
    "image", "imply", "index", "indie", "inner", "input", "irony", "ivory", "jewel", "joint",
    "joker", "judge", "juice", "karma", "knack", "kneel", "knife", "knock", "known", "label",
    "labor", "large", "laser", "later", "laugh", "layer", "learn", "lease", "leave", "lemon",
    "level", "light", "limit", "linen", "liver", "lobby", "local", "lodge", "logic", "loose",
    "lover", "lower", "loyal", "lucky", "lunch", "lunar", "lyric", "magic", "major", "manor",
    "maple", "march", "match", "mayor", "media", "mercy", "merge", "merit", "metal", "meter",
    "might", "minor", "minus", "mixed", "model", "money", "month", "moral", "motif", "motor",
    "mount", "mouse", "mouth", "movie", "music", "naive", "nerve", "never", "night", "noble",
    "noise", "north", "noted", "novel", "nurse", "occur", "ocean", "offer", "often", "olive",
    "onset", "opera", "orbit", "order", "organ", "other", "ought", "outer", "oxide", "ozone",
    "paint", "panel", "paper", "party", "pasta", "patch", "pause", "peace", "peach", "pearl",
    "penny", "phase", "phone", "photo", "piano", "piece", "pilot", "pinch", "pixel", "place",
    "plain", "plane", "plant", "plate", "plaza", "plead", "plumb", "plume", "plump", "point",
    "polar", "porch", "pouch", "pound", "power", "press", "price", "pride", "prime", "print",
    "prior", "prize", "probe", "prone", "proof", "prose", "proud", "prove", "proxy", "pulse",
    "punch", "pupil", "purse", "token", "queen", "query", "quest", "queue", "quick", "quiet",
    "quota", "quote", "radar", "radio", "raise", "rally", "ranch", "range", "rapid", "ratio",
    "reach", "react", "ready", "realm", "rebel", "refer", "reign", "relax", "repay", "reply",
    "rider", "ridge", "rifle", "right", "rigid", "rival", "river", "roast", "robin", "robot",
    "rocky", "rouge", "rough", "round", "route", "royal", "rural", "saint", "salad", "sauce",
    "scale", "scare", "scene", "scent", "scope", "score", "scout", "shaft", "shame", "shape",
    "share", "shark", "sharp", "sheep", "sheer", "sheet", "shelf", "shell", "shift", "shine",
    "shirt", "shock", "shore", "short", "shout", "sight", "sigma", "since", "sixth", "sixty",
    "sized", "skill", "skull", "slash", "slate", "slave", "sleep", "slice", "slide", "slope",
    "smart", "smell", "smile", "smoke", "snake", "solar", "solid", "solve", "sorry", "space",
    "spare", "spark", "spawn", "speak", "spear", "speed", "spell", "spend", "spice", "spine",
    "spite", "spoke", "spoon", "sport", "spray", "squad", "stack", "staff", "stage", "stain",
    "stake", "stale", "stall", "stamp", "stand", "stark", "start", "state", "stave", "steal",
    "steam", "steel", "steep", "steer", "stern", "stick", "stiff", "still", "stock", "stone",
    "stood", "store", "storm", "story", "stove", "strap", "straw", "strip", "stuck", "study",
    "stuff", "style", "sugar", "suite", "super", "surge", "swamp", "swear", "sweep", "sweet",
    "swift", "swing", "sword", "syrup", "table", "taste", "teach", "tempo", "tense", "thank",
    "theme", "thick", "thing", "think", "third", "thorn", "those", "three", "threw", "throw",
    "thumb", "tiger", "tight", "timer", "tired", "title", "toast", "today", "topic", "total",
    "touch", "tough", "towel", "tower", "toxic", "trace", "track", "trade", "trail", "train",
    "trait", "trash", "treat", "trend", "trial", "tribe", "trick", "tried", "troop", "truck",
    "truly", "trump", "trunk", "trust", "truth", "tumor", "twist", "ultra", "uncle", "under",
    "unify", "union", "unite", "unity", "until", "upper", "upset", "urban", "usage", "usual",
    "utter", "valid", "value", "vapor", "vault", "venue", "verse", "video", "vigor", "viral",
    "virus", "visit", "visor", "vista", "vital", "vivid", "vocal", "vodka", "voice", "voter",
    "waist", "waste", "watch", "water", "weary", "weave", "wheel", "where", "which", "while",
    "white", "whole", "whose", "wider", "witch", "woman", "world", "worry", "worse", "worst",
    "worth", "would", "wound", "wrath", "wrist", "write", "wrong", "wrote", "yacht", "yield",
    "young", "youth", "zebra"
  ];

  // ─── GAME STATE ───────────────────────────────────────────
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  let targetWord = "";
  let currentRow = 0;
  let currentCol = 0;
  let gameOver = false;
  let guesses = [];          // array of submitted guess strings
  let letterStates = {};     // letter -> best state ("correct" > "present" > "absent")
  let boardTiles = [];       // 2D array [row][col] of tile DOM elements

  // ─── DOM REFS ─────────────────────────────────────────────
  const boardEl = document.getElementById("board");
  const keyboardEl = document.getElementById("keyboard");
  const toastContainer = document.getElementById("toast-container");
  const modalInstructions = document.getElementById("modal-instructions");
  const modalGameOver = document.getElementById("modal-gameover");
  const gameoverTitle = document.getElementById("gameover-title");
  const gameoverMessage = document.getElementById("gameover-message");
  const gameoverGrid = document.getElementById("gameover-grid");

  // ─── INIT ─────────────────────────────────────────────────
  function init() {
    targetWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    currentRow = 0;
    currentCol = 0;
    gameOver = false;
    guesses = [];
    letterStates = {};

    createBoard();
    createKeyboard();
    bindEvents();
    openModal(modalInstructions);   // show instructions on first load
  }

  // ─── BOARD ────────────────────────────────────────────────
  function createBoard() {
    boardEl.innerHTML = "";
    boardTiles = [];
    for (let r = 0; r < MAX_GUESSES; r++) {
      const row = [];
      for (let c = 0; c < WORD_LENGTH; c++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = `tile-${r}-${c}`;
        boardEl.appendChild(tile);
        row.push(tile);
      }
      boardTiles.push(row);
    }
  }

  // ─── KEYBOARD ─────────────────────────────────────────────
  const KEYBOARD_LAYOUT = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
  ];

  function createKeyboard() {
    keyboardEl.innerHTML = "";
    KEYBOARD_LAYOUT.forEach(rowKeys => {
      const rowEl = document.createElement("div");
      rowEl.classList.add("keyboard-row");
      rowKeys.forEach(key => {
        const btn = document.createElement("button");
        btn.classList.add("key");
        btn.dataset.key = key;
        btn.textContent = key;
        btn.id = `key-${key}`;
        if (key === "Enter" || key === "⌫") btn.classList.add("wide");
        rowEl.appendChild(btn);
      });
      keyboardEl.appendChild(rowEl);
    });
  }

  // ─── EVENT BINDING ────────────────────────────────────────
  function bindEvents() {
    // Physical keyboard
    document.addEventListener("keydown", handleKeyDown);

    // On-screen keyboard
    keyboardEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".key");
      if (!btn) return;
      const key = btn.dataset.key;
      if (key === "Enter") submitGuess();
      else if (key === "⌫") deleteLetter();
      else addLetter(key);
    });

    // Help button
    document.getElementById("btn-help").addEventListener("click", () => openModal(modalInstructions));

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach(btn => {
      btn.addEventListener("click", () => {
        closeModal(btn.closest(".modal-overlay"));
      });
    });

    // Close modal on overlay click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    // Share button
    document.getElementById("btn-share").addEventListener("click", shareResults);

    // Play again
    document.getElementById("btn-play-again").addEventListener("click", () => {
      closeModal(modalGameOver);
      init();
    });
  }

  function handleKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector(".modal-overlay.open")) {
      if (e.key === "Escape") closeAllModals();
      return;
    }
    if (e.key === "Enter") { e.preventDefault(); submitGuess(); }
    else if (e.key === "Backspace") deleteLetter();
    else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
  }

  // ─── INPUT ACTIONS ────────────────────────────────────────
  function addLetter(letter) {
    if (gameOver || currentCol >= WORD_LENGTH) return;
    const tile = boardTiles[currentRow][currentCol];
    tile.textContent = letter;
    tile.dataset.letter = letter;
    currentCol++;
  }

  function deleteLetter() {
    if (gameOver || currentCol <= 0) return;
    currentCol--;
    const tile = boardTiles[currentRow][currentCol];
    tile.textContent = "";
    delete tile.dataset.letter;
  }

  // ─── SUBMIT GUESS ─────────────────────────────────────────
  function submitGuess() {
    if (gameOver) return;
    if (currentCol < WORD_LENGTH) {
      shakeRow(currentRow);
      showToast("Not enough letters");
      return;
    }

    const guess = boardTiles[currentRow].map(t => t.dataset.letter).join("");

    // Validate against word list
    if (!WORDS.includes(guess.toLowerCase())) {
      shakeRow(currentRow);
      showToast("Not in word list");
      return;
    }

    const result = evaluateGuess(guess);
    guesses.push({ word: guess, result });

    revealRow(currentRow, result, () => {
      updateKeyboard(guess, result);

      if (guess === targetWord) {
        winGame();
        return;
      }

      currentRow++;
      currentCol = 0;

      if (currentRow >= MAX_GUESSES) {
        loseGame();
      }
    });
  }

  // ─── EVALUATE GUESS (handles duplicate letters correctly) ─
  function evaluateGuess(guess) {
    const result = Array(WORD_LENGTH).fill("absent");
    const targetLetters = targetWord.split("");
    const guessLetters = guess.split("");
    const used = Array(WORD_LENGTH).fill(false);

    // First pass: correct positions
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }

    // Second pass: present but wrong position
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i] === "correct") continue;
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!used[j] && guessLetters[i] === targetLetters[j]) {
          result[i] = "present";
          used[j] = true;
          break;
        }
      }
    }

    return result;
  }

  // ─── REVEAL ROW WITH FLIP ANIMATION ──────────────────────
  function revealRow(row, result, onComplete) {
    const tiles = boardTiles[row];
    let completed = 0;

    tiles.forEach((tile, i) => {
      const delay = i * 300;

      setTimeout(() => {
        tile.classList.add("flip");

        // Change color at the halfway point of the flip
        setTimeout(() => {
          tile.dataset.state = result[i];
        }, 250);
      }, delay);

      // Track animation end
      setTimeout(() => {
        tile.classList.remove("flip");
        completed++;
        if (completed === WORD_LENGTH && onComplete) onComplete();
      }, delay + 500);
    });
  }

  // ─── UPDATE KEYBOARD COLORS ───────────────────────────────
  function updateKeyboard(guess, result) {
    const priority = { correct: 3, present: 2, absent: 1 };
    const priorityMap = { 3: "correct", 2: "present", 1: "absent" };

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const state = result[i];
      const current = letterStates[letter];
      const currentPriority = current ? priority[current] : 0;
      const newPriority = priority[state];

      if (newPriority > currentPriority) {
        letterStates[letter] = state;
      }
    }

    // Update all key visuals
    Object.entries(letterStates).forEach(([letter, state]) => {
      const keyEl = document.getElementById(`key-${letter}`);
      if (keyEl) keyEl.dataset.state = state;
    });
  }

  // ─── WIN / LOSE ───────────────────────────────────────────
  const WIN_MESSAGES = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"];

  function winGame() {
    gameOver = true;

    // Bounce tiles
    const tiles = boardTiles[currentRow];
    tiles.forEach((tile, i) => {
      setTimeout(() => tile.classList.add("bounce"), i * 100);
    });

    setTimeout(() => {
      gameoverTitle.textContent = "🎉 You Win!";
      gameoverMessage.textContent = `${WIN_MESSAGES[currentRow]} You got it in ${currentRow + 1}/${MAX_GUESSES} tries.`;
      gameoverGrid.innerHTML = buildEmojiGrid();
      openModal(modalGameOver);
    }, 1800);
  }

  function loseGame() {
    gameOver = true;
    setTimeout(() => {
      gameoverTitle.textContent = "😔 Game Over";
      gameoverMessage.textContent = `The word was ${targetWord}.`;
      gameoverGrid.innerHTML = buildEmojiGrid();
      openModal(modalGameOver);
    }, 500);
  }

  // ─── EMOJI GRID & SHARE ──────────────────────────────────
  function buildEmojiGrid() {
    const emojiMap = { correct: "🟩", present: "🟨", absent: "⬛" };
    return guesses.map(g => g.result.map(s => emojiMap[s]).join("")).join("<br>");
  }

  function shareResults() {
    const emojiMap = { correct: "🟩", present: "🟨", absent: "⬛" };
    const header = `Wordle ${currentRow + (gameOver && guesses[guesses.length - 1].word === targetWord ? 0 : 0)}/${MAX_GUESSES}`;
    const grid = guesses.map(g => g.result.map(s => emojiMap[s]).join("")).join("\n");
    const text = `${header}\n\n${grid}`;

    navigator.clipboard.writeText(text).then(() => {
      showToast("Copied to clipboard!");
    }).catch(() => {
      showToast("Could not copy");
    });
  }

  // ─── ANIMATIONS / UI HELPERS ──────────────────────────────
  function shakeRow(row) {
    const tiles = boardTiles[row];
    // Wrap tiles in a virtual "row" for shake — we shake each tile
    tiles.forEach(tile => {
      tile.classList.add("shake");
      tile.addEventListener("animationend", () => tile.classList.remove("shake"), { once: true });
    });
  }

  function showToast(msg, duration = 1500) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade");
      toast.addEventListener("transitionend", () => toast.remove());
    }, duration);
  }

  // ─── MODALS ───────────────────────────────────────────────
  function openModal(overlay) {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeModal(overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-overlay.open").forEach(closeModal);
  }

  // ─── START ────────────────────────────────────────────────
  init();

})();
