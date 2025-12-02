// js/profile.js
import {
    auth,
    db,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithPopup,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    signOut,
  } from "./firebaseConfig.js";

  import { setInitialHighScore } from "./game.js";
  
  let currentUser = null;
  let profileRef = null;
  
  const userNameEl = document.getElementById("userName");
  const highScoreEl = document.getElementById("highScore");
  const streakEl = document.getElementById("streak");
  const btnSignIn = document.getElementById("btnSignIn");
  const lbList = document.getElementById("lbList");
  const btnSignOut = document.getElementById("btnSignOut");
  
  // --- Auth ---
  
  async function signIn() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      // if user cancels Google popup, go anonymous
      await signInAnonymously(auth);
    }
  }
  
  async function handleSignOut() {
    try {
      await signOut(auth);
      // The onAuthStateChanged callback will handle the UI updates
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  
  
  function initAuth() {
    if (btnSignIn) {
      btnSignIn.addEventListener("click", signIn);
    }
    
    if (btnSignOut) {
      btnSignOut.addEventListener("click", handleSignOut);
    }

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // Handle sign out state
          currentUser = null;
          profileRef = null;
          if (userNameEl) userNameEl.textContent = "Guest";
          if (highScoreEl) highScoreEl.textContent = "0";
          if (streakEl) streakEl.textContent = "0";
          if (lbList) lbList.innerHTML = "";
          if (btnSignIn) {
            btnSignIn.textContent = "Sign in with Google";
            btnSignIn.disabled = false;
          }
          if (btnSignOut) {
            btnSignOut.style.display = "none";
          }
          return;
        }
        currentUser = user;
        if (userNameEl) {
          userNameEl.textContent = user.displayName || `User-${user.uid.slice(0, 6)}`;
        }
        if (btnSignIn) {
          btnSignIn.textContent = "Signed in";
          btnSignIn.disabled = true;
        }
        if (btnSignOut) {
          btnSignOut.style.display = "inline-block";
        }
  
      profileRef = doc(db, "profiles", user.uid);
      const snap = await getDoc(profileRef);
      if (!snap.exists()) {
        await setDoc(profileRef, {
          displayName: user.displayName || null,
          highScore: 0,
          streakCount: 0,
          lastPlayedISO: null,
          gamesPlayed: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        if (highScoreEl) highScoreEl.textContent = "0";
        if (streakEl) streakEl.textContent = "0";
        // sync local game highScore as well
        setInitialHighScore(0);
      } else {
        const p = snap.data();
        const hs = p.highScore ?? 0;
        const st = p.streakCount ?? 0;
        if (highScoreEl) highScoreEl.textContent = hs;
        if (streakEl) streakEl.textContent = st;
        // sync local game highScore with profile
        setInitialHighScore(hs);
      }
      
  
      await loadLeaderboard();
    });
  }
  
  
  // --- Leaderboard ---
  
  async function loadLeaderboard() {
    if (!lbList) return;
    lbList.innerHTML = "";
  
    const q = query(
      collection(db, "profiles"),
      orderBy("highScore", "desc"),
      limit(10)
    );
    const qs = await getDocs(q);
    qs.forEach((docSnap) => {
      const p = docSnap.data();
      const li = document.createElement("li");
      li.textContent = `${p.displayName || docSnap.id.slice(0, 6)} — ${
        p.highScore || 0
      }`;
      lbList.appendChild(li);
    });
  }

  // Expose leaderboard loader for other modules / inline handlers
  if (typeof window !== "undefined") {
    window.loadLeaderboard = loadLeaderboard;
  }
  
  // --- Update profile on game over ---
  
  async function updateProfileOnGameOver(finalScore) {
    if (!currentUser || !profileRef) return;
  
    const snap = await getDoc(profileRef);
    const p = snap.exists()
      ? snap.data()
      : { highScore: 0, streakCount: 0, lastPlayedISO: null, gamesPlayed: 0 };
  
    // high score
    const newHigh = Math.max(p.highScore || 0, finalScore);
  
    // streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = p.lastPlayedISO ? new Date(p.lastPlayedISO) : null;
    if (last) last.setHours(0, 0, 0, 0);
  
    let newStreak = p.streakCount || 0;
    if (!last) {
      newStreak = 1;
    } else {
      const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        newStreak = p.streakCount || 1;
      } else if (diffDays === 1) {
        newStreak = (p.streakCount || 0) + 1;
      } else {
        newStreak = 1;
      }
    }
  
    await updateDoc(profileRef, {
      highScore: newHigh,
      streakCount: newStreak,
      lastPlayedISO: new Date().toISOString(),
      gamesPlayed: (p.gamesPlayed || 0) + 1,
      updatedAt: serverTimestamp(),
    });
  
    if (highScoreEl) highScoreEl.textContent = newHigh;
    if (streakEl) streakEl.textContent = newStreak;
  
    await loadLeaderboard();
  }
  
  export { initAuth, updateProfileOnGameOver };
  