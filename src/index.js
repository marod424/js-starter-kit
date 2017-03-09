import './index.css';
import { itemsHTML } from './components/items/items';

const app = global.document.getElementById('app')

// Put component html into the app container
app.appendChild(itemsHTML);

// if query string for readme is in url, show the readme inline
if (window.location.href.indexOf('?q=readme') !== -1) {
  let s = require('../README.md');

  // strip off the readme title as the view already has a title
  const readme = s.substring(s.indexOf('<h2 id="intro">'));
  app.innerHTML = readme;
}

/* Tell webpack that this module can handle being hot reloaded,
otherwise it will not hot reload and will display the following
warning in the console:
[HMR] The following modules couldn't be hot updated: (Full reload needed)
This is usually because the modules which have changed (and their parents)
do not know how to hot reload themselves.

fix: https://github.com/glenjamin/webpack-hot-middleware/issues/43
*/
if (module.hot) {
  module.hot.accept();
}
