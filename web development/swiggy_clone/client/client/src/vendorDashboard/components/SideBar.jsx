import React from 'react'
import '../../App.css'

const SideBar = ({isSidebarOpen, showAddFirmHandler, showAddProductHandler}) => {
  return (
    <div className={`sidebarSection ${isSidebarOpen?"show": ""}`}>
        <ul>
            <li onClick={showAddFirmHandler} style={{cursor:"pointer"}}>Add Firm</li>
            <li onClick={showAddProductHandler } style={{cursor:"pointer"}} >Add Product</li>
            <li style={{cursor:"pointer"}} >All Products</li>
            <li style={{cursor:"pointer"}} >User Details</li>
        </ul>
    </div>
  )
}

export default SideBar