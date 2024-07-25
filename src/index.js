import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoaderProvider } from './components/LoaderContext'; // Ensure this path is correct
import reportWebVitals from './reportWebVitals';
import store from './redux/store'; // Ensure this path is correct
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';  // Change this to reflect AntD v5 style

 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </Provider>
);

reportWebVitals();
