import { useEffect, useState } from 'preact/hooks';
import { items, notes } from '../content';
import { exportProgress, getSettings, importProgress, resetProgress, totalSeen, updateSettings } from '../store';

export function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [message, setMessage] = useState('');
  const [persisted, setPersisted] = useState<boolean | null>(null);

  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted, () => {});
  }, []);

  function change(patch: Partial<typeof settings>) {
    updateSettings(patch);
    setSettings(getSettings());
  }

  function download() {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `research-review-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function upload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      importProgress(await file.text());
      setSettings(getSettings());
      setMessage(`Restored progress from ${file.name}.`);
    } catch (err) {
      setMessage(`Could not import: ${(err as Error).message}`);
    }
  }

  function reset() {
    if (confirm('Erase all review history on this device? Export a backup first if unsure.')) {
      resetProgress();
      setMessage('Progress erased.');
    }
  }

  return (
    <div class="page">
      <h1>Settings</h1>

      <section class="panel">
        <label class="row">
          <span>New items per day</span>
          <input
            type="number"
            min={0}
            max={200}
            value={settings.newPerDay}
            onChange={(e) => change({ newPerDay: Math.max(0, Number((e.target as HTMLInputElement).value) || 0) })}
          />
        </label>
        <label class="row">
          <span>Target recall</span>
          <select
            value={String(settings.retention)}
            onChange={(e) => change({ retention: Number((e.target as HTMLSelectElement).value) })}
          >
            <option value="0.85">85% (fewer reviews)</option>
            <option value="0.9">90% (default)</option>
            <option value="0.95">95% (more reviews)</option>
          </select>
        </label>
      </section>

      <h2>Progress backup</h2>
      <p class="muted">
        Review history is stored only on this device. Export it now and then, or to move it to another device.
      </p>
      <section class="panel buttons">
        <button class="button" onClick={download}>
          Export
        </button>
        <label class="button">
          Import
          <input type="file" accept="application/json,.json" onChange={upload} hidden />
        </label>
        <button class="button danger" onClick={reset}>
          Reset
        </button>
      </section>
      {message && <p class="notice">{message}</p>}

      <h2>About</h2>
      <p class="muted small">
        {notes.length} notes · {items.length} items · {totalSeen()} studied
        <br />
        Content built {new Date(__BUILD_TIME__).toLocaleString()}
        <br />
        Storage {persisted === null ? 'status unknown' : persisted ? 'is persistent' : 'may be cleared by the browser'}
      </p>
    </div>
  );
}
