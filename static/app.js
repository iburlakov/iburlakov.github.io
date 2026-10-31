(function () {
  // Page content is rendered by Hugo (layouts/home.html); this script only adds behaviour.

  // ── Copy email ──────────────────────────────────────────────────────────────

  const copyBtn = document.getElementById("copy-email");
  copyBtn.addEventListener("click", function () {
    navigator.clipboard?.writeText(copyBtn.dataset.email);
    copyBtn.textContent = "Copied";
    clearTimeout(copyBtn._t);
    copyBtn._t = setTimeout(function () { copyBtn.textContent = "Copy"; }, 1600);
  });

  // ── Floating background circles ─────────────────────────────────────────────

  const bg = document.getElementById("bg-animation");
  for (let i = 0; i < 15; i++) {
    const circle = document.createElement("div");
    const size = Math.random() * 150 + 50;
    circle.className = "circle";
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = Math.random() * 100 + "%";
    circle.style.top = Math.random() * 100 + "%";
    circle.style.animationDuration = Math.random() * 20 + 10 + "s";
    circle.style.animationDelay = Math.random() * 5 + "s";
    bg.appendChild(circle);
  }
})();
