import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import './index.css';
import './styles/Profile.css'
import './styles/Pad.css'
import './styles/PadContainer.css'
import './styles/MasterControls.css'
import './styles/SetupControls.css'
import './styles/form.css'

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
