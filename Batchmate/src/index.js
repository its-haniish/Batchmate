import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import store from "./redux/store.js"
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      draggable
      theme="light" />
    <RouterProvider router={router} />
  </Provider>
);
