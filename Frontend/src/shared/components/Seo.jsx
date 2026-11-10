import { useEffect } from 'react';

const SITE_URL = 'https://bhookingo.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/bhookingo-logo-new.png`;

/**
 * Seo — per-route document metadata for the public marketing pages.
 *
 * React 19 drops react-helmet-async (its tags silently no-op on React 19),
 * so this manages the head imperatively. It REUSES the tags already present
 * in the static index.html (selecting by name/property) and only updates
 * their content, which avoids duplicate <title>/<meta> tags and cleanly
 * overrides the Phase 1 defaults per route. Static JSON-LD, favicon, robots
 * and viewport tags are left untouched.
 */
function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, path = '/', image = DEFAULT_OG_IMAGE }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canonical = `${SITE_URL}${path}`;

    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
  }, [title, description, path, image]);

  return null;
}
