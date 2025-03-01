import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import '../../App.css'
import VendorLogin from '../components/forms/VendorLogin';
import VendorRegister from '../components/forms/VendorRegister';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
  }
  
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
  }
  
  const showAddFirmHandler = () => {
    setShowAddFirm(true);
    setShowAddProduct(false);
    setShowLogin(false);
    setShowRegister(false);
  }
  
  const showAddProductHandler = () => {
    setShowAddProduct(true);
    setShowAddFirm(false);
    setShowLogin(false);
    setShowRegister(false);
  }
  
  const handleAuthButtons = () => {
    setShowAuthButtons(!showAuthButtons);
  }


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <NavBar toggleSidebar={toggleSidebar} showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showAuthButtons={showAuthButtons} />
      <div className="mainSection">
        <SideBar isSidebarOpen={isSidebarOpen} showAddFirmHandler={showAddFirmHandler} showAddProductHandler={showAddProductHandler} />
        {showLogin && <VendorLogin handleAuthButtons={handleAuthButtons} />}
        {showRegister && <VendorRegister />}
        {showAddFirm && <AddFirm />}
        {showAddProduct && <AddProduct />}
      </div>
    </>
  )
}

export default Home