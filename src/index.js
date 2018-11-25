import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyD-l23KQDtAZKJ4xQoeAYYVnGmWzMQXodQ",
    authDomain: "fir-con-react.firebaseapp.com",
    databaseURL: "https://fir-con-react.firebaseio.com",
    projectId: "fir-con-react",
    storageBucket: "fir-con-react.appspot.com",
    messagingSenderId: "16039068622"
});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
