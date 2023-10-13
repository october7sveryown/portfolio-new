import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home.js';
import Experience from './Experience.js';
import Skills from './Skills.js';
import ChatwithResume from './ChatwithResume.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
//   },
//   {
//     path: "/home",
//     element: <Home/>,
//   },
//   {
//     path: "/experience",
//     element: <Experience/>,
//   },
//   {
//     path: "/skills",
//     element: <Skills/>,
//   },
//   {
//     path: "/chat",
//     element: <ChatwithResume/>,
//   } 
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
