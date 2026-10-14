import { useEffect, useState } from 'preact/hooks';

/** Pre-rendered HTML from the build step (our own content, so trusted). */
export function Html({ html, class: cls, inline }: { html: string; class?: string; inline?: boolean }) {
  const Tag = inline ? 'span' : 'div';
  return <Tag class={cls} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function formatInterval(ms: number) {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d}d`;
  if (d < 365) return `${Math.round(d / 30.4)}mo`;
  return `${(d / 365).toFixed(1)}y`;
}

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Current location hash as path segments, e.g. "#/note/foo" -> ["note", "foo"]. */
export function useRoute(): string[] {
  const get = () => decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/').filter(Boolean);
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const onChange = () => {
      setRoute(get());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
