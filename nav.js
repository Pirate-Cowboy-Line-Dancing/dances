
// nav.js — responsive nav with mobile drawer and no word-per-line title
(function () {
  const LOGO_SRC = "Pirate_Cowboy_Transparent_Circle.png";
  const LOGO_SIZE = 50;

  // Create <nav>
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Primary");
  nav.className = "pcld-nav"; // use class styling instead of inline

  const wrap = document.createElement("div");
  wrap.className = "pcld-nav__wrap";

  // -------- LEFT (logo + brand) --------
  const left = document.createElement("div");
  left.className = "pcld-nav__left";

  const homeLink = document.createElement("a");
  homeLink.href = "index.html";
  homeLink.className = "pcld-nav__home";

  const logo = document.createElement("img");
  logo.src = LOGO_SRC;
  logo.alt = "Pirate Cowboy Line Dancing";
  logo.width = LOGO_SIZE;
  logo.height = LOGO_SIZE;
  logo.className = "pcld-nav__logo";
  homeLink.appendChild(logo);

  const brand = document.createElement("span");
  brand.className = "pcld-nav__brand muted";
  brand.textContent = "Pirate Cowboy Line Dancing";
  left.appendChild(homeLink);
  left.appendChild(brand);

  // -------- RIGHT (links) --------
  const right = document.createElement("div");
  right.className = "pcld-nav__right";

  const links = [
    { text: "Home", href: "index.html" },
    { text: "About", href: "about.html" },
    { text: "Locations", href: "locations.html" }
  ];
  const current = location.pathname.split("/").pop() || "index.html";

  // The visible inline links (desktop)
  const linkRow = document.createElement("div");
  linkRow.className = "pcld-nav__links";
  links.forEach(({ text, href }) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (href === current) {
      a.classList.add("is-active");
    }
    linkRow.appendChild(a);
  });

  // Mobile toggle + drawer
  const menuBtn = document.createElement("button");
  menuBtn.className = "pcld-nav__toggle";
  menuBtn.setAttribute("type", "button");
  menuBtn.setAttribute("aria-label", "Menu");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.innerHTML = `<span class="pcld-nav__burger" aria-hidden="true"></span>`;

  const panel = document.createElement("div");
  panel.className = "pcld-nav__panel";
  panel.setAttribute("aria-hidden", "true");

  const panelList = document.createElement("nav");
  panelList.className = "pcld-nav__panel-list";
  panelList.setAttribute("aria-label", "Mobile");

  links.forEach(({ text, href }) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (href === current) a.classList.add("is-active");
    panelList.appendChild(a);
  });
  panel.appendChild(panelList);

  // Toggle behavior
  function toggleMenu(force) {
    const open = force ?? !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    document.documentElement.classList.toggle("pcld-no-scroll", open);
    document.body.classList.toggle("pcld-no-scroll", open);
  }
  menuBtn.addEventListener("click", () => toggleMenu());

  // Close on route change / link click
  panel.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") toggleMenu(false);
  });

  
// Helpers
function closeMenu() {
  const panel = document.querySelector('.pcld-nav__panel');
  const toggle = document.querySelector('.pcld-nav__toggle');
  if (!panel) return;
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  document.documentElement.classList.remove('pcld-no-scroll');
  document.body.classList.remove('pcld-no-scroll');
}
function openMenu() {
  const panel = document.querySelector('.pcld-nav__panel');
  const toggle = document.querySelector('.pcld-nav__toggle');
  if (!panel) return;
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
  document.documentElement.classList.add('pcld-no-scroll');
  document.body.classList.add('pcld-no-scroll');
}
function isOpen() {
  const panel = document.querySelector('.pcld-nav__panel');
  return panel && panel.classList.contains('is-open');
}

// Toggle button
const toggleBtn = document.querySelector('.pcld-nav__toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => (isOpen() ? closeMenu() : openMenu()));
}

// Close when clicking outside the panel
document.addEventListener('click', (e) => {
  const panel = document.querySelector('.pcld-nav__panel');
  const toggle = document.querySelector('.pcld-nav__toggle');
  if (!panel || !isOpen()) return;
  const clickInsidePanel = panel.contains(e.target);
  const clickToggle = toggle && toggle.contains(e.target);
  if (!clickInsidePanel && !clickToggle) closeMenu();
});

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen()) closeMenu();
});

// Close if screen becomes desktop-sized (e.g., rotation)
const mq = window.matchMedia('(min-width: 641px)');
mq.addEventListener?.('change', () => { if (mq.matches) closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth >= 641) closeMenu(); });

// Close after selecting a link in the panel
document.querySelector('.pcld-nav__panel')?.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'A') closeMenu();
});

  right.appendChild(linkRow);
  right.appendChild(menuBtn);
  nav.appendChild(wrap);
  wrap.appendChild(left);
  wrap.appendChild(right);
  document.body.appendChild(panel); // panel as a sibling overlay

  // Insert nav above header
  const header = document.querySelector("header");
  if (header) header.before(nav);
  else document.body.prepend(nav);
})();
