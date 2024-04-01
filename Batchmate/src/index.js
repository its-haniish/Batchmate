import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from "./redux/store.js"
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.js'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
