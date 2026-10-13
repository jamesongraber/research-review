import { useRoute } from './util';
import { Today } from './views/Today';
import { Review } from './views/Review';
import { Browse } from './views/Browse';
import { NoteView } from './views/NoteView';
import { Settings } from './views/Settings';

export function App() {
  const route = useRoute();
  const [page = 'today', arg] = route;

  let view;
  if (page === 'review') view = <Review key={route.join('/')} noteId={arg} />;
  else if (page === 'browse') view = <Browse subject={arg} />;
  else if (page === 'note' && arg) view = <NoteView key={arg} id={arg} />;
  else if (page === 'settings') view = <Settings />;
  else view = <Today />;

  const tab = page === 'note' || page === 'browse' ? 'browse' : page === 'settings' ? 'settings' : 'today';

  return (
    <>
      <main>{view}</main>
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
