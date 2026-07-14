import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import RootPage from './RootPage.jsx'
import {createBrowserRouter, Navigate} from "react-router";
import {RouterProvider} from "react-router/dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

import SignupForm, {formAction as signupFormAction} from "./components/SignupForm.jsx";
import LoginForm, {formAction as loginFormAction} from "./components/LoginForm.jsx";
import {formAction as userDashboardFormAction} from "./pages/UserDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import {Provider} from "react-redux";

import store from "./store/index.js";

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
        children:[
          {
            index: true,
            element: <Navigate to="login"/>,
          },
          {
            path: 'login',
            element: <LoginForm method="post"/>,
            action: loginFormAction
          },
          {
            path: 'signup',
            element: <SignupForm method="post"/>,
            action: signupFormAction
          },
        ],
      },
      {
        path: 'user',
        element: <UserDashboard/>,
        action: userDashboardFormAction,
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
