import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Vote from './Pages/vote.jsx';
import LiveResults from './Pages/liveResults.jsx';
import Root from './Routes/root.jsx';
import SignIn from './Pages/admin/auth/signIn.jsx';
import Dashboard from './Pages/admin/dashboard.jsx';


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
      {
        path: "admin/signIn",
        element: <SignIn />,
      },
      {
        path: "admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
