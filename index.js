import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store'; 

const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(RootComponent);
