import './index.css';
import { itemsHTML } from './components/items/items';

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

// Put component html into the app container
global.document.getElementById('app').appendChild(itemsHTML);
