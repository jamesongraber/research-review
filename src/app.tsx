import { noteById } from './content';
import { latestSession, remaining, sessionHref } from './session';
import { useRoute } from './util';
import { Today } from './views/Today';
import { Review } from './views/Review';
import { Browse } from './views/Browse';
import { NoteView } from './views/NoteView';
import { Settings } from './views/Settings';

export function App() {
  const route = useRoute();
  const [page = 'today', arg, section] = route;

  let view;
  if (page === 'review') view = <Review key={route.join('/')} noteId={arg} />;
  else if (page === 'browse') view = <Browse subject={arg} />;
  else if (page === 'note' && arg) view = <NoteView key={arg} id={arg} section={section} />;
  else if (page === 'settings') view = <Settings />;
  else view = <Today />;

  const tab = page === 'note' || page === 'browse' ? 'browse' : page === 'settings' ? 'settings' : 'today';
  const session = page === 'review' || page === 'today' ? undefined : latestSession();

  return (
    <>
      <main class={session ? 'with-resume' : ''}>{view}</main>
      {session && <ResumeBar href={sessionHref(session)} left={remaining(session)} sessionKey={session.key} />}
      {page !== 'review' && (
        <nav class="tabbar">
          <a href="#/" class={tab === 'today' ? 'active' : ''}>
            <span class="icon">◎</span>Today
          </a>
          <a href="#/browse" class={tab === 'browse' ? 'active' : ''}>
            <span class="icon">☰</span>Browse
          </a>
          <a href="#/settings" class={tab === 'settings' ? 'active' : ''}>
            <span class="icon">⚙</span>Settings
          </a>
        </nav>
      )}
    </>
  );
}

/** Shown while a review is unfinished, so reading a note mid-review is a round trip. */
function ResumeBar({ href, left, sessionKey }: { href: string; left: number; sessionKey: string }) {
  const label =
    sessionKey === 'daily' ? 'Review in progress' : `Practicing ${noteById.get(sessionKey.slice(5))?.title ?? 'a note'}`;
  return (
    <a class="resume-bar" href={href}>
      <span class="label">
        {label} · {left} left
      </span>
      <span class="go">Resume ›</span>
    </a>
  );
}
