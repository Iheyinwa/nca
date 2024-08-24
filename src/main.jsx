import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Vote from './Pages/vote.jsx';
import LiveResults from './Pages/liveResults.jsx';
import Root from './Routes/root.jsx';
import Dashboard from './Pages/admin/dashboard.jsx';
import AdminRoot from './Pages/admin/adminRoot.jsx';
import Districts from './Pages/admin/districts.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "vote",
        element: <Vote />,
      },
      {
        path: "liveResults",
        element: <LiveResults />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/addDistricts",
        element: <Districts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
