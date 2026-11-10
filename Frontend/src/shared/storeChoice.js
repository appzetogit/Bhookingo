// Dependency-free "choose your platform" popup for the Bhookingo apps.
//   openStoreChoice()             -> customer app (Android + iOS)
//   openStoreChoice('restaurant') -> restaurant/partner app (Android + iOS)
//   openStoreChoice('all')        -> all four (customer + restaurant)
// Uses the original Google Play (multi-colour) and Apple logos.
const APPS = {
  user: {
    title: 'Bhookingo',
    play: 'https://play.google.com/store/apps/details?id=com.bhookingo.user1',
    apple: 'https://apps.apple.com/au/app/bhookingo/id6812318525',
  },
  restaurant: {
    title: 'Bhookingo Partner',
    play: 'https://play.google.com/store/apps/details?id=com.bhookingo.restaurant1',
    apple: 'https://apps.apple.com/in/app/bhookingo-partner/id6812636188',
  },
};

// Original multi-colour Google Play logo.
const PLAY_ICON =
  '<svg width="17" height="17" viewBox="0 0 24 24" style="flex:none">' +
  '<path d="M3.25 2.3c-.15.15-.25.38-.25.68v18.04c0 .3.1.53.25.68l.08.08L13.5 12.18v-.18L3.33 2.22l-.08.08z" fill="#00C3FF"/>' +
  '<path d="M16.89 15.63l-3.39-3.39v-.18l3.39-3.39.08.05 4.01 2.28c1.15.65 1.15 1.73 0 2.38l-4.01 2.28-.08-.03z" fill="#FF3A44"/>' +
  '<path d="M13.59 12.09L3.33 22.25c.38.4 1 .33 1.55.02l12.01-6.84-3.3-3.34z" fill="#00DE76"/>' +
  '<path d="M13.59 12.09l3.3-3.34-12.01-6.84c-.55-.31-1.17-.38-1.55.02l10.26 10.16z" fill="#FFCE00"/></svg>';

// Original Apple logo (white, for a dark button).
const APPLE_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style="flex:none">' +
  '<path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.8 16.32 3.98 9.58 8.1 9.28c1.37.1 2.2.78 3.03.8.84-.02 1.86-.8 3.42-.65 1.64.16 2.82.88 3.5 1.95-3.22 1.88-2.69 6.08.28 7.3-.7 1.76-1.52 3.48-3.28 3.6zM12.03 9.25c-.15-2.23 1.66-4.14 3.75-4.25.2 2.52-2.1 4.54-3.75 4.25z"/></svg>';

function storeBtn(id, platform) {
  const icon = platform === 'android' ? PLAY_ICON : APPLE_ICON;
  const label = platform === 'android' ? 'Android' : 'iOS';
  return (
    '<button id="' + id + '" style="flex:1;display:flex;align-items:center;' +
    'justify-content:center;gap:8px;padding:11px 8px;border:none;border-radius:12px;' +
    'cursor:pointer;background:#111;color:#fff;font-size:13px;font-weight:700;">' +
    icon + '<span>' + label + '</span></button>'
  );
}

function sectionHTML(title, androidId, iosId) {
  return (
    '<div style="margin-top:14px;text-align:left;">' +
    '<div style="font-size:12px;font-weight:800;color:#18110D;margin-bottom:8px;">' + title + '</div>' +
    '<div style="display:flex;gap:10px;">' + storeBtn(androidId, 'android') + storeBtn(iosId, 'ios') + '</div>' +
    '</div>'
  );
}

export function openStoreChoice(app) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('bhk-store-choice')) return;
  const mode = typeof app === 'string' && (app === 'restaurant' || app === 'all') ? app : 'user';

  const overlay = document.createElement('div');
  overlay.id = 'bhk-store-choice';
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;' +
    'justify-content:center;padding:16px;background:rgba(10,8,6,0.62);' +
    '-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);' +
    'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;';
  const close = () => overlay.remove();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  const card = document.createElement('div');
  card.style.cssText =
    'background:#fff;border-radius:22px;max-width:380px;width:100%;' +
    'padding:24px 22px 18px;box-shadow:0 24px 70px rgba(0,0,0,0.35);text-align:center;';

  let body;
  if (mode === 'all') {
    body =
      '<div style="font-size:18px;font-weight:800;color:#18110D;">Download the Bhookingo app</div>' +
      '<div style="font-size:12.5px;color:#6b7280;margin-top:4px;">Pick the app and your device</div>' +
      sectionHTML('Customer App', 'u-and', 'u-ios') +
      sectionHTML('Restaurant Partner App', 'r-and', 'r-ios');
  } else {
    const cfg = APPS[mode];
    body =
      '<div style="font-size:18px;font-weight:800;color:#18110D;">Download ' + cfg.title + '</div>' +
      '<div style="font-size:12.5px;color:#6b7280;margin-top:4px;">Choose your device to continue</div>' +
      '<div style="display:flex;gap:10px;margin-top:16px;">' +
      storeBtn('one-and', 'android') + storeBtn('one-ios', 'ios') + '</div>';
  }
  card.innerHTML =
    body +
    '<button id="bhk-cancel" style="margin-top:16px;background:none;border:none;color:#9ca3af;' +
    'font-size:12.5px;font-weight:600;cursor:pointer;">Cancel</button>';

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  const go = (url) => { window.open(url, '_blank', 'noopener'); close(); };
  const bind = (id, url) => { const b = card.querySelector('#' + id); if (b) b.onclick = () => go(url); };
  if (mode === 'all') {
    bind('u-and', APPS.user.play); bind('u-ios', APPS.user.apple);
    bind('r-and', APPS.restaurant.play); bind('r-ios', APPS.restaurant.apple);
  } else {
    bind('one-and', APPS[mode].play); bind('one-ios', APPS[mode].apple);
  }
  card.querySelector('#bhk-cancel').onclick = close;
}

export default openStoreChoice;
