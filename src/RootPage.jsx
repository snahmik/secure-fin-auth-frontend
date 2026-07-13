import {useState} from 'react'
import NavBar from "./components/NavBar.jsx";
import {Outlet} from "react-router";


function RootPage() {

  return (
    <div className="flex flex-col h-full">
      <NavBar/>
      <main className="px-64 py-16 flex-1">
        <Outlet/>
      </main>
    </div>
  )
}

export default RootPage
