import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Quotes from './components/Quotes'
import Home from './components/Home'
import Navbar from './Navbar'
import SideBar from './SideBar'
import About from './components/About'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Pending from "./sideControls/Pendings"
import Backlog from "./sideControls/Backlog"
import Ongoing from "./sideControls/Ongoing"
import Completed from "./sideControls/Completed"


function App() {

  return (
    <>
    <Navbar/>
    <SideBar/>
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path = "/quotes" element = {<Quotes/>}/>
        <Route path='/about' element = {<About/>}/>
        {/* sidebar routes */}
        <Route path = "/pending" element = {<Pending/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path = "/completed" element = {<Completed/>}/>
        <Route path = "/backlog" element = {<Backlog/>}/>
        <Route path = "/ongoing" element = {<Ongoing/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
