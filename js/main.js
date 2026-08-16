"use strict";
// ---------- 言語切り替え ----------
function initLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isEn = document.body.classList.toggle("lang-en");
    btn.textContent = isEn ? "JA" : "EN";
    document.documentElement.lang = isEn ? "en" : "ja";
  });
}

// ---------- スクロールで要素をフェードイン ----------
function initRevealOnScroll() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// ---------- 上部のスクロール進捗バー ----------
function initProgressLine() {
  const progressLine = document.getElementById("progressLine");
  if (!progressLine) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressLine.style.width = `${scrolled}%`;
  });
}

// ---------- ヒーローのカーソル追従グロー ----------
function initHeroGlow() {
  const hero = document.getElementById("heroSection");
  const glow = document.getElementById("heroGlow");
  if (!hero || !glow || !window.matchMedia("(pointer:fine)").matches) return;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.left = `${x}%`;
    glow.style.top = `${y}%`;
  });
}

// ---------- ターミナル風タイプライター ----------
function initTerminalTypewriter(reduceMotion) {
  const typeTarget = document.getElementById("typeTarget");
  if (!typeTarget) return;
  const termLines = [
    "$ whoami",
    "yuki_sato — design engineer -> web engineer",
    "",
    "$ cat skills.json",
    "{",
    '  "frontend": ["JavaScript", "React", "TypeScript"],',
    '  "backend": ["Python", "Django", "Java"],',
    '  "tools": ["AutoCAD", "Git", "Django Admin"]',
    "}",
    "",
    "$ status --current",
    "building. always.",
  ];
  if (reduceMotion) {
    typeTarget.textContent = termLines.join("\n");
    return;
  }
  let lineIndex = 0;
  let charIndex = 0;
  const typeChar = () => {
    if (lineIndex >= termLines.length) return;
    const line = termLines[lineIndex];
    if (charIndex < line.length) {
      typeTarget.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeChar, 16 + Math.random() * 24);
    } else {
      typeTarget.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 240);
    }
  };
  setTimeout(typeChar, 900);
}

// ---------- Worksカードの3Dチルト & マグネティックボタン ----------
function initTiltAndMagnetic(reduceMotion) {
  if (!window.matchMedia("(pointer:fine)").matches || reduceMotion) return;
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = (y / r.height - 0.5) * -7;
      const ry = (x / r.width - 0.5) * 7;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.16}px, ${y * 0.4}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// ---------- 学習アクティビティのヒートマップ(イメージ図) ----------
function buildHeatmap() {
  const el = document.getElementById("heatmap");
  if (!el) return;
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const weeks = 53;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const recentBoost = w / weeks;
      const r = rand();
      let level = 0;
      const p = r * (0.4 + recentBoost * 0.9);
      if (p > 0.78) level = 4;
      else if (p > 0.58) level = 3;
      else if (p > 0.38) level = 2;
      else if (p > 0.2) level = 1;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-l", String(level));
      el.appendChild(cell);
    }
  }
}

// ---------- Workカードのモーダル(テキストプレビュー) ----------
function initWorkModal() {
  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn?.focus();
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
    const targetId = trigger.dataset.modalTarget;
    if (!targetId) return;
    const modal = document.getElementById(targetId);
    if (!modal) return;
    trigger.addEventListener("click", () => openModal(modal));
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(modal);
      }
    });
  });
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.querySelector(".modal-close")?.addEventListener("click", () => closeModal(overlay));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay:not([hidden])").forEach(closeModal);
    }
  });
}

// ---------- Playground: ミニ製図ツール ----------
function initBlueprintTool() {
  const canvas = document.getElementById("blueprintCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const GRID = 20;
  let lines = [];
  let current = null;
  const snap = (v) => Math.round(v / GRID) * GRID;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += GRID) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += GRID) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    lines.forEach((l) => {
      ctx.strokeStyle = "#C9A15A";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
      ctx.fillStyle = "#6E93E8";
      [[l.x1, l.y1], [l.x2, l.y2]].forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    if (current) {
      ctx.strokeStyle = "rgba(201,161,90,0.6)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(current.x1, current.y1);
      ctx.lineTo(current.x2, current.y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const cx = (e.clientX - r.left) * (canvas.width / r.width);
    const cy = (e.clientY - r.top) * (canvas.height / r.height);
    return { x: cx, y: cy };
  }

  canvas.addEventListener("pointerdown", (e) => {
    const p = getPos(e);
    current = { x1: snap(p.x), y1: snap(p.y), x2: snap(p.x), y2: snap(p.y) };
    canvas.setPointerCapture(e.pointerId);
    render();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!current) return;
    const p = getPos(e);
    current.x2 = snap(p.x);
    current.y2 = snap(p.y);
    render();
  });
  canvas.addEventListener("pointerup", () => {
    if (current) {
      if (current.x1 !== current.x2 || current.y1 !== current.y2) lines.push(current);
      current = null;
      render();
    }
  });
  document.getElementById("undoBtn")?.addEventListener("click", () => {
    lines.pop();
    render();
  });
  document.getElementById("clearBtn")?.addEventListener("click", () => {
    lines = [];
    render();
  });
  render();
}

(function main() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  initLangToggle();
  initRevealOnScroll();
  initProgressLine();
  initHeroGlow();
  initTerminalTypewriter(reduceMotion);
  initTiltAndMagnetic(reduceMotion);
  buildHeatmap();
  initWorkModal();
  initBlueprintTool();
})();
