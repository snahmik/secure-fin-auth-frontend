import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RootPage from './RootPage.jsx'
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

import {formAction as signupFormAction} from "./components/SignupForm.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const router = createBrowserRouter(
  [{
    path: "/",
    element: <RootPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "auth",
        element: <AuthPage/>,
        action: signupFormAction
      },
      {
        path: 'user',
        element: <UserDashboard/>,
      },
      {
        path: 'admin',
        element: <AdminDashboard/>,
      },
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
