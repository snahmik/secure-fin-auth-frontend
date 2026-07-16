import React, {useEffect, useState} from 'react';
import {logoutUser} from "../api/authApi.js";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {authActions} from "../store/index.js";

const LogoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    async function logout() {
      const data = await logoutUser()

      if (!data.success) {
        console.log("Failed to logout")
      }

      dispatch(authActions.logout())
      navigate('/')
    }

    logout()
  },[])

  return (
    <div className={'text-center text-2xl font-bold mt-10'}>Logging You Out...</div>
  );
};

export default LogoutPage;