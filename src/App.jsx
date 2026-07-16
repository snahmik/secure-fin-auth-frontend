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
import {formAction as userDashboardFormAction} from "./components/UserAccountPanel.jsx";
import UserDashboard, {loader as userDashboardLoader} from "./pages/UserDashboard.jsx";
import AdminDashboard, {loader as adminDashboardLoader} from "./pages/AdminDashboard.jsx";
import {Provider} from "react-redux";
import store, {authActions} from "./store/index.js";
import {retrieveSession} from "./api/authApi.js";
import ProtectedRoute from "./navigation/ProtectedRoute.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";

async function rootLoader(){
  if (store.getState().auth.isAuthenticated) {
    return
  }

  try{
    const res = await retrieveSession()
    if (res.success) {
      const {user_id, role} = res.user
      store.dispatch(authActions.authenticate({userId: user_id, role: role}))
    } else {
      store.dispatch(authActions.logout())
    }
  } catch (e) {
    store.dispatch(authActions.logout())
  }
}

const router = createBrowserRouter(
  [{
    path: "/",
    element: <RootPage/>,
    loader: rootLoader,
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
        element: <ProtectedRoute requiredRole={'user'}><UserDashboard/></ProtectedRoute>,
        action: userDashboardFormAction,
        loader: userDashboardLoader,
        shouldRevalidate: ({actionResult}) => actionResult?.success === true
      },
      {
        path: 'admin',
        element: <ProtectedRoute requiredRole={'admin'}><AdminDashboard/></ProtectedRoute>,
        loader: adminDashboardLoader,
      },
      {
        path: 'logout',
        element: <LogoutPage/>
      }
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
