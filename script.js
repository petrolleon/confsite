/* ------------------------------------------------------------------
   Données du site : à modifier ici quand les infos sont confirmées
------------------------------------------------------------------- */
const CONFERENCE = {
  date: "2026-12-14T08:30:00", // heure locale du visiteur
  socials: [
    { name: "TikTok", handle: "@chab.conf", url: "https://www.tiktok.com/@chab.conf" },
    { name: "Instagram", handle: "@chab.conf", url: "https://www.instagram.com/chab.conf/" },
  ],
};

// Types de créneaux : libellé affiché + classe CSS
const KINDS = {
  talk: ["Intervenant", "talk"],
  student: ["Élèves", "student"],
  break: ["Pause", "break"],
  ceremony: ["Cérémonie", "ceremony"],
};

const MORNING = [
  {
    start: "8h30", end: "9h15", kind: "student",
    title: "Discours d’ouverture, puis « Des dinosaures au dodo »",
    who: "Ouverture : Ulysse, Marc, Alexandre et Paul · Intervention : Léna et Margaux",
    details: "Comment l’IA transforme-t-elle le rêve de la résurrection en réalité scientifique ?",
  },
  { start: "9h15", end: "10h00", kind: "talk", title: "L’IA et le droit", who: "Juliette Piovesan" },
  {
    start: "10h00", end: "10h30", kind: "break", title: "Pause &amp; mini-ateliers",
    details: "« Cépadel’IA » avec Clément, Sacha, Timothée, Maël et Raphaël · Un quiz pour gagner une pâtisserie ou une boisson avec Mona, Maryam, Feriel et Rayhana.",
  },
  {
    start: "10h30", end: "11h15", kind: "talk", title: "« L’IA ne nous rendra pas plus humains »",
    who: "Sophie Guibal", details: "30 à 40 minutes, questions comprises.",
  },
  {
    start: "11h15", end: "12h00", kind: "student", title: "L’IA dans les entreprises",
    who: "PMH (élèves)", details: "30 minutes de présentation + 15 minutes de questions.",
  },
  { start: "12h00", end: "13h30", kind: "break", title: "Pause déjeuner" },
];

const AFTERNOON = [
  { start: "13h30", end: "14h15", kind: "student", title: "Quels sont les impacts de l’IA sur les arts ?", who: "Lilou et Jeanne (élèves)" },
  { start: "14h15", end: "15h00", kind: "talk", title: "Intervention à confirmer" },
  { start: "15h00", end: "15h30", kind: "break", title: "Pause" },
  { start: "15h30", end: "16h15", kind: "talk", title: "Intervention à confirmer" },
  { start: "16h15", end: "16h30", kind: "ceremony", title: "Discours de clôture", who: "Marc et Ulysse" },
];

const SPEAKERS = [
  { name: "Juliette Piovesan", topic: "L’IA et le droit", slot: "9h15", initials: "JP" },
  { name: "Sophie Guibal", topic: "« L’IA ne nous rendra pas plus humains »", slot: "10h30", initials: "SG" },
  { name: "Jérôme Lecourtier", role: "Entreprise Pixel Dorado", topic: "Intervention scientifique et technique", initials: "JL" },
  { name: "Benjamin Rey", initials: "BR" },
];

const STUDENT_TALKS = [
  { who: "Léna et Margaux", slot: "8h30", topic: "Des dinosaures au dodo : comment l’IA transforme-t-elle le rêve de la résurrection en réalité scientifique ?" },
  { who: "PMH", slot: "11h15", topic: "L’IA dans les entreprises" },
  { who: "Lilou et Jeanne", slot: "13h30", topic: "Quels sont les impacts de l’intelligence artificielle sur les arts ?" },
];

// Logos dans img/sponsors/
const SPONSORS = [
  { name: "Hôtel du Centre (Pierrelatte)", logo: "hotel-du-centre.jpg" },
  { name: "Freegun", logo: "freegun.jpg" },
  { name: "AXA Assurance", logo: "axa.jpg" },
  { name: "DCA Bâtiment Services", logo: "dca.jpg" },
  { name: "Gregori International", logo: "gregori.jpg" },
  { name: "Clari — pompage, curage, inspection", logo: "clari.jpg" },
  { name: "Silversun Énergie Solaire", logo: "silversun.jpg" },
  { name: "Teste Autocars", logo: "teste.jpg" },
];

/* ------------------------------------------------------------------
   Rendu
------------------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const rv = (i, step) => `data-reveal style="--d:${i * step}ms"`; // apparition échelonnée

const slotHTML = (it, i) => {
  const [label, kind] = KINDS[it.kind];
  return `<li class="slot ${kind}" ${rv(i, 70)}>
    <div class="time"><b>${it.start}</b><span>${it.end}</span></div>
    <div class="slot-body">
      <span class="badge">${label}</span>
      <p class="slot-title">${it.title}</p>
      ${it.who ? `<p class="who">${it.who}</p>` : ""}
      ${it.details ? `<p class="details">${it.details}</p>` : ""}
    </div>
  </li>`;
};
$("#morning").innerHTML = MORNING.map(slotHTML).join("");
$("#afternoon").innerHTML = AFTERNOON.map(slotHTML).join("");

$("#speakers").innerHTML = SPEAKERS.map((s, i) => `
  <article class="speaker tone-${i % 4}" ${rv(i, 100)}>
    <div class="avatar">${s.initials}</div>
    <h3>${s.name}</h3>
    ${s.role ? `<p class="role">${s.role}</p>` : ""}
    <p class="topic${s.topic ? "" : " tba"}">${s.topic || "Thème bientôt dévoilé"}</p>
    ${s.slot ? `<p class="slot-pill">${s.slot}</p>` : ""}
  </article>`).join("");

$("#student-talks").innerHTML = STUDENT_TALKS.map((t) =>
  `<li><small>${t.slot}</small><b>${t.who}</b><p>${t.topic}</p></li>`).join("");

// Bandeau défilant : la liste est doublée pour une boucle continue (la copie est masquée aux lecteurs d’écran)
const logo = (s, copy) => `<img src="img/sponsors/${s.logo}" alt="${copy ? "" : s.name}"${copy ? ' aria-hidden="true"' : ""} loading="lazy">`;
$("#marquee").innerHTML = SPONSORS.map((s) => logo(s)).join("") + SPONSORS.map((s) => logo(s, true)).join("");
$("#sponsor-grid").innerHTML = SPONSORS.map((s, i) => `
  <figure class="sponsor" ${rv(i % 4, 80)}>
    <div><img src="img/sponsors/${s.logo}" alt="" loading="lazy"></div>
    <figcaption>${s.name}</figcaption>
  </figure>`).join("");

$$(".socials").forEach((el) => {
  el.innerHTML = CONFERENCE.socials
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name} <span>${s.handle}</span></a>`)
    .join("");
});

/* ------------------------------------------------------------------
   Vagues décoratives : le motif est tracé sur deux largeurs puis
   décalé horizontalement pour une boucle sans coupure
------------------------------------------------------------------- */
const W = 1200;
const LINES = 26;
const wavePath = (i) => {
  const base = 30 + i * 18;
  const amp = 22 + (i % 5) * 6;
  const phase = i * 0.35;
  let d = "";
  for (let x = 0; x <= W * 2; x += 20) {
    const y = base + Math.sin((x / W) * Math.PI * 4 + phase) * amp + Math.sin((x / W) * Math.PI * 2 + i) * 10;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d;
};
const wavesSVG = (k) => `<svg viewBox="0 0 ${W * 2} 520" preserveAspectRatio="none">
  <defs><linearGradient id="wave-${k}" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#2ee6e6" stop-opacity=".15"/>
    <stop offset=".5" stop-color="#7ef3c9" stop-opacity=".55"/>
    <stop offset="1" stop-color="#2ee6e6" stop-opacity=".15"/>
  </linearGradient></defs>
  ${Array.from({ length: LINES }, (_, i) => `<path d="${wavePath(i)}" fill="none" stroke="url(#wave-${k})" stroke-width="${i % 4 === 0 ? 1.6 : 0.9}"/>`).join("")}
</svg>`;
$$(".waves").forEach((el, k) => { el.innerHTML = wavesSVG(k); });

/* ------------------------------------------------------------------
   Compte à rebours
------------------------------------------------------------------- */
const countdown = $("#countdown");
const target = new Date(CONFERENCE.date).getTime();
const UNITS = ["jours", "heures", "min", "sec"];
let timer;

function tick() {
  const diff = Math.max(0, target - Date.now());
  if (diff === 0) {
    countdown.innerHTML = '<p class="hand today">C’est aujourd’hui — bienvenue à tous !</p>';
    clearInterval(timer);
    return;
  }
  const values = [
    Math.floor(diff / 864e5),
    Math.floor(diff / 36e5) % 24,
    Math.floor(diff / 6e4) % 60,
    Math.floor(diff / 1e3) % 60,
  ];
  countdown.innerHTML = UNITS
    .map((label, i) => `<div class="unit"><span class="num">${String(values[i]).padStart(2, "0")}</span><span class="unit-label">${label}</span></div>`)
    .join('<span class="sep" aria-hidden="true">:</span>');
}
tick();
timer = setInterval(tick, 1000);

/* ------------------------------------------------------------------
   En-tête : fond au défilement + menu mobile
------------------------------------------------------------------- */
const header = $("#header");
const menuBtn = $("#menu-btn");

function setMenu(open) {
  header.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}
menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));
$$("#nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ------------------------------------------------------------------
   Apparition des blocs au défilement (après le rendu des listes)
------------------------------------------------------------------- */
const revealTargets = $$("[data-reveal]");
if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  revealTargets.forEach((el) => observer.observe(el));
}
