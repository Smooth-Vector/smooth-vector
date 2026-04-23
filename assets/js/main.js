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
  dark:  { bg:'#0b0a09', bg2:'#141210', bg3:'#1c1916', fg:'#f0ece6', fg2:'#8a8279', fg3:'#4a4540' },
  light: { bg:'#f8f5f1', bg2:'#f0ece6', bg3:'#e8e3dc', fg:'#1c1916', fg2:'#6b6359', fg3:'#a09890' },
  warm:  { bg:'#100d0a', bg2:'#1a1410', bg3:'#241c14', fg:'#f5ede0', fg2:'#9a8878', fg3:'#5a4a3a' },
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
