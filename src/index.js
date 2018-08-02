import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dash from './Dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dash />, document.getElementById('root'));
registerServiceWorker();
