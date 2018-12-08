import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import './components/404/NotFound.css';
import './shared/header.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
