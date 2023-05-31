import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/cssPages/style.css';
// import DecisionPage from './pages/DecisionPage';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  </React.StrictMode>
);