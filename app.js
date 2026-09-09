(function () {
  const p = PROFILE;

  // ── Content ────────────────────────────────────────────────────────────────

  document.title = p.name;
  document.querySelector('meta[name="description"]').content = p.bio;

  document.getElementById("nav-brand").textContent = p.name;

  document.getElementById("hero-heading").textContent =
    "I'm " + p.name +
    (p.title ? ", " + p.title : "") +
    (p.location ? " in " + p.location : "") + ".";

  if (p.photo) {
    const img = document.createElement("img");
    img.src = p.photo;
    img.alt = "Portrait of " + p.name;
    const portrait = document.getElementById("portrait");
    portrait.innerHTML = "";
    portrait.appendChild(img);
  }

  const badge = document.getElementById("availability-badge");
  if (p.openToWork) {
    badge.innerHTML =
      '<span class="availability-dot"></span>' +
      "<span>Open to work — " + p.availability + "</span>";
    badge.style.display = "flex";
  }

  document.getElementById("hero-bio").textContent = p.bio;

  document.getElementById("skills-content").innerHTML = p.skills
    .map(
      (g) =>
        '<div class="skill-row">' +
        '<div class="skill-category">' + g.category + "</div>" +
        '<div class="skill-items">' +
        g.items.map((i) => "<span>" + i + "</span>").join("") +
        "</div></div>"
    )
    .join("");

  document.getElementById("elsewhere-content").innerHTML =
    p.elsewhere
      .map(
        (l) =>
          '<a href="' + l.href + '" target="_blank" rel="noreferrer" class="link-row">' +
          '<span class="link-name"><i class="' + l.icon + ' link-icon"></i>' + l.label + "</span>" +
          '<span class="link-handle">' + l.handle + "</span>" +
          '<i class="fa-solid fa-arrow-up-right-from-square link-arrow"></i>' +
          "</a>"
      )
      .join("") +
    '<div class="link-row">' +
    '<span class="link-name"><i class="fa-regular fa-envelope link-icon"></i>Email</span>' +
    '<a href="mailto:' + p.email + '" class="link-email">' + p.email + "</a>" +
    '<button type="button" id="copy-email" class="copy-btn">Copy</button>' +
    "</div>";

  document.getElementById("cv-btn").href = p.cvUrl;

  // ── Dark mode ───────────────────────────────────────────────────────────────

  function applyTheme(dark) {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const icon = document.getElementById("theme-icon");
    if (icon) icon.className = dark ? "fa-regular fa-sun" : "fa-regular fa-moon";
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  }

  // Sync icon with theme already applied by the inline head script
  applyTheme(document.documentElement.dataset.theme === "dark");

  document.getElementById("theme-toggle").addEventListener("click", function () {
    applyTheme(document.documentElement.dataset.theme !== "dark");
  });

  // ── Copy email ──────────────────────────────────────────────────────────────

  document.addEventListener("click", function (e) {
    if (e.target.id !== "copy-email") return;
    navigator.clipboard?.writeText(p.email);
    e.target.textContent = "Copied";
    clearTimeout(e.target._t);
    e.target._t = setTimeout(function () { e.target.textContent = "Copy"; }, 1600);
  });

  // ── Back to top ─────────────────────────────────────────────────────────────

  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  }, { passive: true });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ── AOS ─────────────────────────────────────────────────────────────────────

  AOS.init({ once: true, duration: 600, offset: 60 });
})();
