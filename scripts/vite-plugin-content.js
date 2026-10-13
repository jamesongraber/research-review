// Exposes the parsed content as `import content from 'virtual:content'`
// and reloads the dev server page whenever a note changes.
import { resolve } from 'node:path';
import { loadContent } from './content.js';

const ID = 'virtual:content';
const RESOLVED = '\0' + ID;

export default function contentPlugin({ dir = 'content' } = {}) {
  let contentDir;
  return {
    name: 'research-review-content',
    configResolved(config) {
      contentDir = resolve(config.root, dir);
    },
    resolveId(id) {
      if (id === ID) return RESOLVED;
    },
    load(id) {
      if (id !== RESOLVED) return;
      const { notes, items, subjects, errors, warnings, files } = loadContent(contentDir);
      for (const f of files) this.addWatchFile(f);
      for (const w of warnings) this.warn(w);
      if (errors.length) this.error(`Content errors:\n  ${errors.join('\n  ')}`);
      return `export default ${JSON.stringify({ notes, items, subjects })};`;
    },
    configureServer(server) {
      server.watcher.add(contentDir);
      const onChange = (file) => {
        if (!resolve(file).startsWith(contentDir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', onChange);
      server.watcher.on('change', onChange);
      server.watcher.on('unlink', onChange);
    },
  };
}
