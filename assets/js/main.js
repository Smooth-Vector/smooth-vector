// Mobile nav toggle
const navEl = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
if (navEl && navToggle) {
  const closeMenu = () => {
    navEl.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  navToggle.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  navEl.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navEl.classList.contains('nav-open')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && navEl.classList.contains('nav-open')) closeMenu();
  });
}

// Pricing card selection
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Tweaks panel
const TWEAK_DEFAULTS = { theme: 'warm', accent: 'violet', typeScale: 100 };
let tweaks = { ...TWEAK_DEFAULTS };

const accentMap = {
  teal:   'oklch(72% 0.17 182)',
  violet: 'oklch(68% 0.18 280)',
  amber:  'oklch(76% 0.16 65)',
  green:  'oklch(72% 0.18 148)',
};

const themeMap = {
  dark:  { bg:'#181512', bg2:'#221e1a', bg3:'#2c2622', fg:'#f0ece6', fg2:'#c0b098', fg3:'#887868' },
  light: { bg:'#f8f5f1', bg2:'#f0ece6', bg3:'#e8e3dc', fg:'#1c1916', fg2:'#6b6359', fg3:'#a09890' },
  warm:  { bg:'#24211e', bg2:'#2e2824', bg3:'#383028', fg:'#f5ede0', fg2:'#c8b8a8', fg3:'#8a7a6a' },
};

function applyTweaks() {
  const r = document.documentElement;
  const t = themeMap[tweaks.theme] || themeMap.dark;
  r.style.setProperty('--bg', t.bg);
  r.style.setProperty('--bg2', t.bg2);
  r.style.setProperty('--bg3', t.bg3);
  r.style.setProperty('--fg', t.fg);
  r.style.setProperty('--fg2', t.fg2);
  r.style.setProperty('--fg3', t.fg3);

  const acc = accentMap[tweaks.accent] || accentMap.teal;
  r.style.setProperty('--accent', acc);
  r.style.setProperty('--accent-dim', acc.replace(')', ' / 0.15)'));
  r.style.setProperty('--accent-border', acc.replace(')', ' / 0.35)'));

  document.documentElement.style.fontSize = tweaks.typeScale + '%';
}

applyTweaks();

window.addEventListener('message', e => {
  if (e.data?.type === '__activate_edit_mode') {
    document.getElementById('tweaks-panel').style.display = 'block';
  } else if (e.data?.type === '__deactivate_edit_mode') {
    document.getElementById('tweaks-panel').style.display = 'none';
  }
});
window.parent.postMessage({ type: '__edit_mode_available' }, '*');

document.getElementById('tweak-theme').value = tweaks.theme;
document.getElementById('tweak-accent').value = tweaks.accent;
document.getElementById('tweak-scale').value = tweaks.typeScale;

document.getElementById('tweak-theme').addEventListener('change', e => {
  tweaks.theme = e.target.value; applyTweaks();
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: tweaks.theme } }, '*');
});
document.getElementById('tweak-accent').addEventListener('change', e => {
  tweaks.accent = e.target.value; applyTweaks();
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { accent: tweaks.accent } }, '*');
});
document.getElementById('tweak-scale').addEventListener('input', e => {
  tweaks.typeScale = +e.target.value; applyTweaks();
  window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { typeScale: tweaks.typeScale } }, '*');
});
