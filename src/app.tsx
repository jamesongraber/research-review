import { chapterKey, latestSession, remaining, sessionHref, sessionKey, sessionLabel } from './session';
import { useRoute } from './util';
import { Today } from './views/Today';
import { Review } from './views/Review';
import { Browse } from './views/Browse';
import { NoteView } from './views/NoteView';
import { Settings } from './views/Settings';
import { TourView } from './views/Tour';

export function App() {
  const route = useRoute();
  const [page = 'today', arg, section, extra] = route;

  let view;
  if (page === 'review') {
    // #/review, #/review/<noteId>, #/review/chapter/<tourId>/<chapterId>
    const key = arg === 'chapter' && section && extra ? chapterKey(section, extra) : sessionKey(arg);
    view = <Review key={key} scopeKey={key} />;
  } else if (page === 'browse') view = <Browse subject={arg} />;
  else if (page === 'note' && arg) view = <NoteView key={arg} id={arg} section={section} />;
  else if (page === 'tour') view = <TourView id={arg} tab={section} />;
  else if (page === 'settings') view = <Settings />;
  else view = <Today />;

  const tab =
    page === 'note' || page === 'browse' ? 'browse' : page === 'tour' ? 'tour' : page === 'settings' ? 'settings' : 'today';
  const session = page === 'review' || page === 'today' ? undefined : latestSession();

  return (
    <>
      <main class={session ? 'with-resume' : ''}>{view}</main>
      {session && <ResumeBar href={sessionHref(session)} left={remaining(session)} label={sessionLabel(session.key)} />}
      {page !== 'review' && (
        <nav class="tabbar">
          <a href="#/" class={tab === 'today' ? 'active' : ''}>
            <span class="icon">◎</span>Today
          </a>
          <a href="#/tour" class={tab === 'tour' ? 'active' : ''}>
            <span class="icon">⌖</span>Tour
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
function ResumeBar({ href, left, label }: { href: string; left: number; label: string }) {
  return (
    <a class="resume-bar" href={href}>
      <span class="label">
        {label} · {left} left
      </span>
      <span class="go">Resume ›</span>
    </a>
  );
}
