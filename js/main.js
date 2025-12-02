// js/main.js
import { initAuth } from "./profile.js";
import { initGame } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initGame();
});
