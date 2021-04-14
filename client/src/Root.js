import React from 'react';
import App from './component/App';
import { Provider } from 'react-redux';
import store from './store';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;