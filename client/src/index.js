import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './component/App';
import './index.css'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
};

export default render;
