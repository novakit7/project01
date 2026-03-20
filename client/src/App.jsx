import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Quotes from './components/Quotes'
import Home from './components/Home'
import Profile from './components/Profile'
import Navbar from './Navbar'
import SideBar from './SideBar'
import About from './components/About'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Navbar/>
    <SideBar/>
      <Routes>
        <Route path = "/quotes" element = {<Quotes/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path='/' element = {<Home/>}/>
        <Route path='/profile' element = {<Profile/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
