import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Landing from './Landing';
import Game from './Game';

const router = createBrowserRouter([
  {
    path: "/SENG-513-A2",
    element: <Landing />,
  },
  {
    path: "/SENG-513-A2/game",
    element: <Game />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
