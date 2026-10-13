import { render } from 'preact';
import 'katex/dist/katex.min.css';
import './style.css';
import { App } from './app';

// Ask the browser not to evict review progress under storage pressure.
navigator.storage?.persist?.().catch(() => {});

render(<App />, document.getElementById('app')!);
