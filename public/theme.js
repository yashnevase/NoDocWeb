try {
  const theme = globalThis.localStorage.getItem('nodoc-site-theme');
  globalThis.document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
} catch { /* The default appearance works without local storage. */ }
