import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, compose} from "redux";
import {Provider} from 'react-redux';
import reducers from "./store/reducers";
import {middlewares, sagaMiddleware} from './store/middlewares';
import {watchAuth, watchIngredients, watchOrders, watchPurchase} from './store/sagas/watcher';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(middlewares));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchIngredients);
sagaMiddleware.run(watchOrders);
sagaMiddleware.run(watchPurchase);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
